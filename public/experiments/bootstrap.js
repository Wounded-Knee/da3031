const doEvent = (event) => {
  const ae = d3.processEvent({
    ...event,
    sourceId: event.sourceId || -1,
  }).affectedEntity;
  return ae ? ae.id : undefined;
};

const eventBootstrap = () => {
  const entity = doEvent({ ADD: { name: 'Entity' } });

  const command = doEvent({ ADD: { name: 'Command', type: entity } });
  const user = doEvent({ ADD: { name: 'User', type: entity } });
  const tag = doEvent({ ADD: { name: 'Tag', type: entity } });
  const comment = doEvent({ ADD: { name: 'Comment', type: entity } });
  const tagApplication = doEvent({ ADD: { name: 'Tag Application', type: entity } });
  const tagApplicationRatification = doEvent({ ADD: { name: 'Tag Application Ratification', type: entity } });

  const ɐʞoʎǝH = doEvent({ ADD: { name: 'ɐʞoʎǝH', type: user } });
  const MagicalRainbow = doEvent({ ADD: { name: 'MagicalRainbow', type: user } });

  const ɐʞoʎǝH2 = doEvent({ MUTATE: { id: ɐʞoʎǝH, xyzzy: true } });

  const tagPresence = doEvent({ ADD: { name: 'Presence', type: tag } });
  const tagAww = doEvent({ ADD: { name: 'Aww!', type: tag } });
  doEvent({ ADD: { name: 'Interruption', type: tag } });
  doEvent({ ADD: { name: 'Slander', type: tag } });
  doEvent({ ADD: { name: 'Racism', type: tag } });

  var currentUser = ɐʞoʎǝH;
  var comment1 = doEvent({ sourceId: currentUser, ADD: { text: 'I love MagicalRainbow.', type: comment } });
  var tagApp1 = doEvent({ sourceId: currentUser, ADD: { subjectId: comment1, tagId: tagAww, type: tagApplication } });
  doEvent({ sourceId: currentUser, ADD: { subjectId: tagApp1, type: tagApplicationRatification } });
  doEvent({ sourceId: MagicalRainbow, ADD: { subjectId: tagApp1, type: tagApplicationRatification } });
};
