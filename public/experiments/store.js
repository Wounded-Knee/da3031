const generalAccessors = {
  id: {
    getterName: 'id',
    get: function () {
      const { id } = this.entity;
      return id;
    },
  },
  date: {
    getterName: 'date',
    get: function () {
      const { created } = this.entity.date;
      return created;
    },
  },
  type: {
    getterName: 'type',
    view: function () {
      if (!this.getType().getName) debugger;
      return this.getType().getName();
    },
    get: function () {
      const { entity, store } = this;
      const typeId = entity.type === -1 ? this.getId() : entity.type;
      return store.getEntityById(typeId);
    },
  },
  name: {
    getterName: 'name',
    get: function () {
      const { name } = this.entity;
      return name;
    },
  },
  text: {
    getterName: 'text',
    get: function () {
      const { text } = this.entity;
      return text;
    },
  },
  tags: {
    getterName: 'tags',
    get: function () {
      const { entity, store } = this;
      const tags = [];
      store
        .getEntities((compareEntity) => compareEntity.type === ENTITY_TYPE_TAG_APPLICATION && compareEntity.subjectId === entity.id)
        .forEach((tagApp) => {
          const tagAppRats = tagApp.getRatifications();
          const tag = store.getEntityById(tagApp.getId());
          tags.push({
            tag,
            ratifications: tagAppRats,
          });
        });
      return tags;
    },
    view: function () {
      const tags = {};
      this.getTags().forEach((tag) => {
        console.log('tag', tag);
        tags[tag.tag.getName()] = tag.ratifications.length;
      });
      return tags;
    },
  },
};

const tagAppAccessors = {
  ratifications: {
    getterName: 'ratifications',
    get: function () {
      const { entity, store } = this;
      return store.getEntities((compareEntity) => compareEntity.type === ENTITY_TYPE_TAG_APPLICATION_RATIFICATION && compareEntity.subjectId === entity.id);
    },
    view: function () {
      const { entity, store } = this;
      return this.getRatifications().map((rat) => rat.getDate());
    },
  },
  tag: {
    getterName: 'tag',
    get: function () {
      const { entity, store } = this;
      return store.getEntityById(entity.tagId);
    },
    view: function () {
      return this.getTag().getName();
    },
  },
  subject: {
    getterName: 'subject',
    get: function () {
      const { entity, store } = this;
      return store.getEntityById(entity.subjectId);
    },
    view: function () {
      return this.getSubject().getText();
    },
  },
};

const accessors = {
  ...generalAccessors,
  ...tagAppAccessors,
};

const entityProfiles = {
  [ENTITY_TYPE_ANY]: [accessors.id, accessors.date, accessors.type],
  [ENTITY_TYPE_ENTITY]: [accessors.name],
  [ENTITY_TYPE_COMMENT]: [accessors.text, accessors.tags],
  [ENTITY_TYPE_TAG]: [accessors.name],
  [ENTITY_TYPE_USER]: [accessors.name],
  [ENTITY_TYPE_TAG_APPLICATION]: [accessors.ratifications, accessors.tag, accessors.subject],
};

class Entity {
  constructor(entity, store) {
    if (!entity) return false;
    this.entity = entity;
    this.store = store;
    this.accessors = [...entityProfiles[ENTITY_TYPE_ANY], ...(entityProfiles[entity.type] || [])];

    this.accessors.forEach((accessor) => {
      const getterName = this.accessorToGetterName(accessor);
      this[getterName] = accessor.get.bind(this);
    });
  }

  accessorToGetterName({ getterName }) {
    return 'get' + getterName.charAt(0).toUpperCase() + getterName.slice(1);
  }

  get viewModel() {
    const { entity, store } = this;
    if (!entity) return false;
    const viewModel = {};
    const defaultView = function (accessor) {
      const getterName = this.accessorToGetterName(accessor);
      return this[getterName];
    }.bind(this);
    this.accessors.forEach((accessor) => {
      const { getterName } = accessor;
      viewModel[getterName] = (accessor.view || defaultView(accessor)).call(this);
    });
    return viewModel;
  }
}

class Store {
  constructor() {
    this.entities = [];
    this.entityIdMax = 0;
  }

  getEntity(selector) {
    return new Entity(this.entities.find(selector), this);
  }

  getEntities(selector) {
    return this.entities.filter(selector).map((entity) => new Entity(entity, this));
  }

  getEntityById(id) {
    if (!id && id !== 0) return false;
    return this.getEntity((entity) => entity.id === id);
  }

  get viewModel() {
    return this.entities.map((entity) => new Entity(entity, this).viewModel);
  }

  get viewModelTypes() {
    const viewModelTypes = {};
    this.entities.forEach((entity) => {
      const viewModel = new Entity(entity, this).viewModel;
      viewModelTypes[viewModel.type] = [...(viewModelTypes[viewModel.type] || []), viewModel];
    });
    return viewModelTypes;
  }

  processEvent(event) {
    const { ADD, MUTATE, DELETE, sourceId } = event;

    var affectedEntity = {
      type: ENTITY_TYPE_ENTITY,
    };

    if (ADD) {
      affectedEntity = {
        ...affectedEntity,
        ...ADD,
        sources: [sourceId],
        id: this.entityIdMax++,
        date: {
          created: new Date(),
        },
      };
      this.entities.push(affectedEntity);
    } else if (DELETE && DELETE.id !== undefined) {
      this.entities = [...this.entities.filter((entity) => entity.id !== DELETE.id)];
      affectedEntity = undefined;
    } else if (MUTATE && MUTATE.id !== undefined) {
      var oldEntity = this.getEntityById(MUTATE.id).entity;
      affectedEntity = {
        ...affectedEntity,
        ...oldEntity,
        ...MUTATE,
        sources: [...(oldEntity.sources || []), sourceId],
        date: {
          ...oldEntity.date,
          modified: new Date(),
        },
      };

      this.entities = [...this.entities.filter((entity) => entity.id !== MUTATE.id), affectedEntity];
    } else {
      console.warn('Unable to process event ', event);
      return false;
    }

    return {
      success: true,
      affectedEntity,
    };
  }
}
