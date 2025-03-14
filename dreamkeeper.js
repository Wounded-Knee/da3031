const lines = [
	"I will tell you as it was told to me...",
	"as told by the elders to my Grandfather.",
	"When a young person was seeking his way...",
	"looking for answers to guide him along the Good Red Road of Life...",
	"the elders took him up to the mountain...",
	"and put him up for four days and four nights.",
	"No food, no water.",
	"Just his buffalo robe and the canunpa, the sacred pipe...",
	"and his self.",
	"Be quiet!",
	"This was called the hanbieceya:",
	"to seek for a vision...",
	"a dream to show him the way.",
	"Is your name No Ears?",
	"I am Eagle Boy.",
	"Who speaks to me?",
	"The Spirits?",
	"There are other mountains you could have picked. Why here?",
	"All night long we have to hear you singing, crying...",
	"talking to yourself. What are you, crazy?",
	"-I come seeking a vision. -''I come seeking a vision''.",
	"You are not worthy of a vision, Eagle Boy.",
	"You will not give up this quest. You are a warrior.",
	"-What happened, Grandpa? -Did he get eaten?",
	"-Did he get eaten? -Eagle Boy!",
	"-I don't remember now. -Grandpa!",
	"It was told to me so long, long ago by my Grandpa.",
	"Who heard it from Black Elk. Who heard it from his great-grandpa.",
	"Who heard it from the storytelling stone himself.",
	"Bear Butte must 've eaten him. I know it.",
	"Well, he knew he had to go through many tests to find his vision.",
	"So he began to sing, to call on the helping spirits.",
	"And then...",
	"You better get my money, boy.",
	"I will tell you what happened another day.",
	"Sometimes the stories come, sometimes they go.",
	"Just like that one over there.",
	"-What happened to you? -Nothing.",
	"Looks Like something. Something to do with that Mae Little Wounded?",
	"Mom!",
	"You know, if you want to win her heart...",
	"you give her the end of the bread.",
	"-Give her the end of a loaf of bread? -Old Lakota woman secret.",
	"She'll think I'm psycho. Can I borrow some cash?",
	"Yeah, there's a million dollars in casino money underneath my dresser.",
	"-Just leave me a few thousand. -Whatever.",
	"What 's this? Fight?",
	"-I fell off a horse. -You never been on a horse...",
	"to fall off of a horse.",
	"-Listen. I need to talk to you, Shane. -Why?",
	"It 's about Grandpa. He's getting old.",
	"He's been talking about, you know, taking the journey.",
	"He's been talking about taking that journey for a long time.",
	"He's almost eighty-seven.",
	"He told Eddy Two Bulls he was a hundred and two.",
	"He told this white lady looking for an Indian name that he was 49.",
	"I'll be home later.",
	"I know Grandpa, Shane. This is going to be his last Powwow.",
	"He wants to go to New Mexico to the All Nations.",
	"-Why? -He's a storyteller.",
	"One of the last old ones. People need him.",
	"Can't he just send an email? He's too old to go six hundred miles.",
	"But you're old enough to drive.",
	"-Why me? -Because he don't want no one else.",
	"He wants you, Shane. He wants you to get him to the Powwow.",
	"-I can't. -Can't?",
	"-I got things to do. -Like what?",
	"Summer on the rez. What are you going to do, get in trouble?",
	"Volunteer work, community service.",
	"Help my mother pick chokecherries. Anything but that.",
	"Get me to the Powwow.",
	"I'll give you my best pony, 1966 V-8 Special.",
	"It 's name is Many Miles With No Muffler. But it runs fine.",
	"I can't keep this, Shane.",
	"Why not?",
	"Yeah, I guess you got a point. Why not?",
	"Damn, Mae, I have to ask you something.",
	"What do you want to ask me?",
	"I want to ask you, you know...",
	"if I could have that back.",
	"I pawned a boom box up in Scenic to get that.",
	"I owe Victor's Bloods money for some smoke.",
	"They were gonna kill me. So I took the boom box up to pawn.",
	"And that 's when I seen it, the ring...",
	"-Give it back at the end of the summer. -Is that you? What did I tell you?",
	"What 's going on, Shane?",
	"-Victor wants his maza-ska. -Look, you'll get your money.",
	"-You're damn right... -The boom box weren't mine neither.",
	"I need to pawn the ring back, just for a few days.",
	"-I thought Indian Giver's just a myth. -It is.",
	"Then I'll keep it till you talk to the Old Man about going out with me.",
	"-What 's going on out there? -Shane, where's the box, Bro?",
	"First you owe Victor money, now you took his tunes!",
	"-I told you I'd get it. -Tomorrow.",
	"Or you got to deal with the Vice Lord.",
	"You owe the Dog Soldiers money. Or they'll find you in the Badlands.",
	"It is a fine pony.",
	"-What? -It is a fine pony.",
	"How many miles to Albuquerque?",
	"-Many. -Many...",
	"''My heroes have always killed cowboys.''",
	"I see. That 's your war shirt?",
	"Man wears that shirt... does that make him an Indian?",
	"-I am an Indian. -You're an angry Indian.",
	"I don't trust any Skin who ain't angry.",
	"Right. The white man stole all our land.",
	"So for the rest of your life you'll blame all your troubles on Custer...",
	"and not even try to make a life.",
	"-What are you doing? -I forgot something.",
	"What did you forget?",
	"-How far it is till Albuquerque. -We made a trade for a1966 pony.",
	"You can keep your 1966 pony, Grandpa.",
	"I really don't need this right now, okay?",
	"I've got problems, man.",
	"Ah, you're pitiful. The Spirits told Eagle Boy...",
	"I don't need stories, Grandpa.",
	"Eagle Boy could do nothing but hang on for his young life.",
	"See?",
	"I am a strong-hearted warrior...",
	"worthy of a vision.",
	"Two more nights. Stay strong.",
	"You will receive your vision. You will return to camp...",
	"with wisdom and power.",
	"Help me!",
	"Help me!",
	"How do you Like that, Spirits?",
	"Do you see how powerful I am? Now, give me a vision!",
	"So, what happened?",
	"-What? -To Eagle Boy... what happened?",
	"The Thunderbird made a great storm. Lightning came out of his eyes.",
	"Eagle Boy tried will all his might to meet the trials of his hambleceya.",
	"Could he, or could he not?",
	"You're the storyteller, man.",
	"I will tell you tomorrow. If I'm still in this world.",
	"-You can't leave me hanging! -I'm the storyteller, man.",
	"I can do what I want. New Mexico is that way, isn't it?",
	"You will learn what happened to Eagle Boy when we get there.",
	"And I tell it as it was told to me.",
	"Let 's ride!",
	"-Who the hell's chasing us? -Just some guys, Grandpa.",
	"They must be after Three Moons, my war horse.",
	"No, they're after my ass.",
	"They're better off with my horse.",
	"Turn here.",
	"-That 's not a turn! -Turn!",
	"You see, in the old days, it was not so easy to win a girl.",
	"Blue Bird Woman. Here he comes again.",
	"High Horse from Spotted Tail's band.",
	"There were many trials a man had to go through.",
	"It was not two days ago, High Horse...",
	"that you came to my camp with a fine pony.",
	"Now you come with two.",
	"I am going to die. And I wish for you to have these excellent ponies.",
	"Why are you going to die?",
	"I have heard of no war with the Crow.",
	"I am going to die. If I cannot have your daughter, Blue Bird Woman.",
	"I am going to walk into a Crow enemy camp and throw away my life.",
	"-Do you own a death song? -I do.",
	"A strong one.",
	"Good.",
	"Go sing it. And don't come back.",
	"It is me.",
	"High Horse.",
	"My father has not given me away. Yet you still return, again and again.",
	"Tonight. You will find me and my pony by the river.",
	"We will run far away. High Horse and Blue Bird Woman.",
	"Like two fingers crossed.",
	"A fine woman does not run away with a man.",
	"What must I do? I brought many horses but your father sends me away!",
	"Do you not see that I am beginning to walk upside down Like a heyoka?",
	"I am a Lakota woman. I want to be won.",
	"Tomorrow I go run the buffalo with the uncles.",
	"You must watch our daughter as the hawk watches a mud swallow.",
	"A father fears his youngest will run away with a young man.",
	"Never. She thinks too highly of herself.",
	"Like her father.",
	"She thinks so highly of herself, I believe she might want to be stolen.",
	"Did you not steal a nice woman from a lodge across the Cheyenne River?",
	"Did she not want to be stolen?",
	"She was getting old an thinner and there was no one trying to win her.",
	"Tonight, you will tie her hands to her bed.",
	"Are you drinking white man's water?",
	"I will watch the tipi door until the sun.",
	"You are a foolish old man.",
	"l once had a fine friend named High Horse.",
	"Our mothers taught us to ride by tying us to one pony together...",
	"and letting it run. When High Horse fell, I fell.",
	"We hunted buffalo. We sang war songs.",
	"Now that friend is gone.",
	"I am here, you fool.",
	"No, your body sits here.",
	"But your spirit chases a girl up the Cheyenne River.",
	"Like a man chasing a ghost pony, never to be caught.",
	"Find yourself another woman.",
	"One whose father is not named Kills Enemy.",
	"When we were boys together as you say, what was it that I longed to be?",
	"-A kit fox warrior. -And you?",
	"A holy man. A wise man.",
	"If you were such a man, and I believe someday you will be...",
	"what wisdom would you give to your friend High Horse?",
	"-Her father guards the tipi, you say? -Yes.",
	"-All men in the village are warned. -It is so.",
	"Only a fool would steal the daughter of a chief in a camp warned as such.",
	"Or someone who's been kicked in the head by a buffalo.",
	"Or a wanagi, a dark spirit from the great beyond.",
	"Red Deer.",
	"You are indeed a wise man.",
	"A spirit comes!",
	"-What is it? -It is a wanagi.",
	"A dark spirit. Offer it food.",
	"Run, or I eat all of you!",
	"Perhaps he too has come for my daughter. Chase him!",
	"What is it?",
	"The village is chasing away a spirit. That is all.",
	"Catch him and chop him up!",
	"It is the only way to be rid of such a spirit.",
	"Maybe I am not so wise yet.",
	"A crazy thing I have done.",
	"It was useless. High Horse tried everything to have that girl.",
	"But now that he was dishonored, how could he ever go back?",
	"He had no choice.",
	"He would ride now into the Crow enemy camp and die with honor.",
	"He was not afraid, for he had already thrown away his life.",
	"Here I am!",
	"-I am your enemy! -What is this coming?",
	"You must kill me!",
	"I beg of you!",
	"Take me!",
	"You must kill me!",
	"Run!",
	"Do not run, Crow! Take me!",
	"Yes, yes, pony! Bring them home!",
	"Like a vision they came. Crow ponies, up the river.",
	"War ponies, and buffalo runners, and those of the medicine paint.",
	"Those that had been stolen from the Lakota long ago.",
	"Crow horses. Those stolen from us long ago.",
	"How can this be?",
	"Great wealth and hope had returned to a people in need.",
	"-High Horse! -It is I.",
	"Since the Moon When The Deer Shed Their Horns...",
	"we have tried to steal back our horses from the Crow.",
	"We have lost men...",
	"but we have never regained our ponies.",
	"Behold! A young man named High Horse!",
	"You must know this: it was not ponies I desired.",
	"Whether it be two or a great herd.",
	"I wanted a son, High Horse.",
	"A son who as a true man...",
	"and a doer of great deeds.",
	"Join roads with her and be happy.",
	"The fire I've lit for your daughter will never go out.",
	"Damn!",
	"This can't happen! We have half a tank.",
	"Sometimes the gauge doesn't work.",
	"-Why didn't you tell me? -Because sometimes it does.",
	"It 's gonna rain.",
	"What, the spirits tell you that?",
	"The bullet I got in my hip in France tells me that.",
	"Hurts Like hell when it 's gonna rain.",
	"You must find some gas.",
	"Take Three Moons, the dun horse.",
	"I was right.",
	"The Trail of Tears.",
	"Come on, Moons.",
	"Let 's go!",
	"What 's the use, Grandpa? He's lame, anyhow.",
	"-And guess what? We're screwed. -Shut up and pray.",
	"Thunder Beings!",
	"They speak to an old man. Listen.",
	"It happened many summers in the past...",
	"in the village of the Akwesasne Mohawks.",
	"The great Haudenosaunee.",
	"He was a Thunder Spirit, you see.",
	"And he had watched her all summer long.",
	"He fell in love with a woman, down in the corn...",
	"but it could never be.",
	"She Crosses The Water!",
	"Run to the long house!",
	"Run, daughter, now!",
	"Run!",
	"For she was a Haudenosaunee, a Mohawk, and he...",
	"was a Thunder Being.",
	"Sky Woman spoke from above.",
	"She summoned the Thunder Spirit back where he belonged.",
	"Sky Woman, I will turn into lightning and die in the ground below...",
	"before I let her go from me.",
	"Father!",
	"I must touch her.",
	"Father!",
	"Do not be frightened, Woman-from-down-in-the-corn.",
	"I have watched you for so long.",
	"I could not live another day without you.",
	"I know the way you walk to the river in the morning...",
	"and clean your skin.",
	"I watch your long house until the last fire goes out.",
	"No man has ever loved a woman as I love you.",
	"But you are not a man.",
	"I am spirit. I am Thunder. You are human.",
	"We are one.",
	"\"He has always been troublesome\", Sky Woman speaks.",
	"\"Have you not been hearing the thunders more than usual?\"",
	"Yes.",
	"\"Has not the rain fallen greater than before...",
	"...making the corn grow tall?\" -It is so, Sky Woman.",
	"\"Still\", speaks Sky Woman.",
	"\"lf you wish to return to the Haudenosaunee, go.",
	"Walk that way.\"",
	"But if you wish to remain here, in the Land of Sky Woman...",
	"take my hand.",
	"I choose to stay...",
	"with this one who will love me more than any husband could below.",
	"She was happy there in the Land of Sky Woman...",
	"living among the Thunder Spirits.",
	"The Wind Creatures were sent down to gather food for the woman...",
	"so that she could eat as her own kind.",
	"Perhaps the woman does not have all she needs.",
	"Today, I can bring you a fine dress, made from the dust of the sun itself.",
	"My mother can weave for you a shawl Like you have never seen.",
	"-It'll be made from the sun, stars... -I am content here, husband.",
	"Only I wish that our long house was not so small.",
	"It is not large enough for a Spirit and his wife?",
	"It is large enough for a Spirit and his wife.",
	"But not for the Spirit 's child who is coming.",
	"Never were two beings in such deep love.",
	"Two worlds had become one.",
	"Sky Woman, you are the clan mother of all.",
	"But now...",
	"you are going to be a Grand Mother.",
	"Speak, Sky Woman, please.",
	"A woman from the land below cannot give birth to a child here...",
	"in the Sky World.",
	"She Crosses The Water must return to her Mohawk people...",
	"and raise the child among its own.",
	"Thunder Spirit, we must all lose what we love sometime.",
	"It is the way.",
	"If you truly love this woman...",
	"deliver her back to her people, now.",
	"She Crosses The Water, you will raise a boy down below.",
	"You will lead a good life.",
	"But if anyone should ever strike this child...",
	"you will lose him.",
	"Please, remember me.",
	"Will you watch over me and our child?",
	"Always.",
	"Praise the spirit of the rain!",
	"Get to the long houses!",
	"My daughter!",
	"I have come home.",
	"Who took you from us so Long ago?",
	"Who did this to you?",
	"I will dig up my war ax from beneath the tree of peace...",
	"and I'll find this one.",
	"No man touched me, Father.",
	"The child was born in the Moon of Big Snows.",
	"His name was Thunder Boy.",
	"My grandchild is so full of mischief.",
	"I believe his father must be Abenaki or Ojibwa.",
	"I told you, Mother. He is son of the Thunder Being.",
	"Child, you were stolen during the storm...",
	"by men from another tribe.",
	"You are too ashamed to speak the truth.",
	"Look what you've done!",
	"Never touch my child!",
	"If anyone ever strikes him, he will be taken away!",
	"Spring came to the Mohawk people, and with it the maple ceremony...",
	"giving thanks for the rejuvenation of Mother Earth.",
	"Yes, your father says hello!",
	"I love you, Thunder Boy...",
	"just as I Love him.",
	"The boy was smaller than the Mohawks...",
	"and his habits were different than the ways of ordinary boys.",
	"Whenever a thunderstorm would approach...",
	"the boy would run out and laugh and play.",
	"Mother, I am needed in the squash.",
	"Then I will keep my eyes on my grandchild.",
	"Do not cry, grandson.",
	"You are a good child...",
	"even if maybe you come from people we do not know.",
	"Father!",
	"Up there is Sky Woman.",
	"We do not know who your father is.",
	"-Love, father. -Your father is not the thunder.",
	"Your mother went crazy when struck by lightning in the storm.",
	"She wandered lost into a camp of fishing people.",
	"Stop!",
	"No!",
	"No!",
	"Mother!",
	"I warned you!",
	"Thunder Boy was gone forever.",
	"Thunder Boy!",
	"Thunder Boy!",
	"It was known that the child returned to the Thunders.",
	"-Oh, my daughter! -Heartbroken...",
	"she would sing to him for the rest of her life whenever it stormed.",
	"And so did the generations to follow.",
	"Won't be Long, man.",
	"Get him to the Powwow, Let him tell his stories.",
	"Get this rig back and go see Mae's father.",
	"With three hundred horses stolen from the Crow! Okay.",
	"Wanna be.",
	"-Get this rig back in one piece... -How come we didn't stop?",
	"We got to make the Powwow, Grandpa.",
	"When was the last time you seen a white man stop to pick up an Indian?",
	"Long ago.",
	"It was told among the Klowas...",
	"that there lived a brother and sister...",
	"who loved each other as any brother and sister.",
	"Though they looked different, and were.",
	"The boy's name was Tehan...",
	"and he had been captured from the whites many years before.",
	"His sister's name was Talks A Lot, because, well, she talked a lot.",
	"But he love her, and she loved Tehan as her own brother.",
	"Broken Lance...",
	"someone told me you were with the men up on the canyon wall.",
	"Hello, Tehan. Your head, it is on fire.",
	"-Do not insult my brother! -Sister, please go.",
	"When will someone learn that he is one of us?",
	"When will a woman see her brother has skin Like the belly of a frog?",
	"You have stolen our lands and now you wish to steal our ways?",
	"Go!",
	"Bear Robe took me for his son.",
	"You insult his honor by insulting me. For this I will fight you.",
	"Your father is a Kiowa.",
	"You are a Tehan, a Texan, captured from the whites.",
	"I have dreams of your red scalp hanging in my tipi.",
	"I remember the white man's ways. I do not wish them for my own.",
	"Your blood is not our blood.",
	"You must leave the Kiowa.",
	"If I see you when the sun returns tomorrow...",
	"my knife won't stop where it has today.",
	"Tehan.",
	"That one is only angry because he Let his father's ponies run away.",
	"Many colts Lost in the canyon.",
	"He's afraid to chase them because the white men are everywhere.",
	"Do not hate Broken Lance.",
	"It is hard to trust any white man.",
	"Sister...",
	"I am leaving.",
	"-You must not. -I will return.",
	"But only with the runaway colts.",
	"To prove that I am a true Kiowa.",
	"If I do not return...",
	"remember me always, as your brother.",
	"-Easy there, savage. -Hold it there.",
	"He ain't no savage. Damn, that's a white in jury.",
	"What 's your name, boy?",
	"-Name? -You remember that word? Name.",
	"My name is Tehan.",
	"I'll be damned.",
	"That 's him. That 's the red-headed Kiowa they talk about at Fort Sill.",
	"He's one of us.",
	"-It's alright. Hang up that bow. -Get him!",
	"Get him up this ridge.",
	"You know them better than anyone, Red.",
	"If we push them to the river, do they cross...",
	"or go up into the brazada?",
	"I cannot remember much of how it was.",
	"They're going to surrender to Fort Sill.",
	"Or be pushed north and off their Lands.",
	"I need you, Red.",
	"I saved your Life from the savages.",
	"-I need you now. -They will never go north.",
	"They are not cowards, Like some.",
	"I will ride alone to their camp.",
	"-I will convince them to gather... -Leave this fort and you're dead.",
	"Am I understood?",
	"Come on, son. Show us your rabbit dance.",
	"I'll give you a cognac.",
	"In the far corner, where the moon makes Light...",
	"that is where they keep their powder.",
	"Little Hand!",
	"What...?",
	"-Brother! -Quick!",
	"You red-headed son of a...",
	"The Kiowa welcomed Tehan home with honoring songs.",
	"There is no choice now. We must keep moving.",
	"We will find a good place in the North.",
	"I stay.",
	"I stay and I fight, so the women can reach the north.",
	"Then I do also.",
	"Who stays with Broken Lance and fights for the Kiowa?",
	"Tehan! You must travel north with us!",
	"No. Broken Lance is right, sister.",
	"Someone must stay and keep the whites back.",
	"Or they will never stop chasing.",
	"You must go, have children...",
	"and keep the Kiowa strong!",
	"You will die here, Tehan. You could have survived as a white man.",
	"But I am a Kiowa.",
	"My sister stood for me. Now I stand for her.",
	"Then Let us make war, brother.",
	"If our blood spills, it spills together.",
	"And then returns to the same mother.",
	"And so Tehan fought for the people his heart belonged to.",
	"He truly was a Kiowa...",
	"and he passed into legend as the Great Red-Headed Warrior.",
	"-I really appreciate it, man. -No problem.",
	"I can almost smell the fry bread. We are not far.",
	"I'm really hoping they give me an Indian name this year.",
	"You're bringing your horse to the Powwow. How awesome is that!",
	"-What? -The horse...",
	"is good medicine to the Lakota, as I understand it.",
	"I bet you talk to your horse. You understand him, he understands you.",
	"Like brothers! Brothers of the wind!",
	"Hey, Grandpa. He thinks Gandhi picked him up hitch-hiking.",
	"I know this guy from Houston, was adopted at the Powwow Last year.",
	"An elder did the ceremony and everything.",
	"-Maybe I'll get adopted this year. -3OO bucks, we'll adopt you.",
	"-And give you an Indian name. -Knock it off.",
	"Sorry, man.",
	"I'm really tired.",
	"They got cable.",
	"-Ain't staying here. -Why not?",
	"-I'm going to get some coffee. -No cream in mine. I'm a vegan.",
	"Thanks.",
	"Come on! Come on, come on!",
	"I'm gonna use your outhouse. I'll hook you up when I get back.",
	"Hey, come on.",
	"Thanks.",
	"-Grandpa... -They got a swimming pool and cable!",
	"-Get in. -What...",
	"Get in.",
	"-Here, take it. -Thank you.",
	"Come on, Grandpa!",
	"Eagle Boy had now gone three days and three nights...",
	"with no food or water.",
	"But he had yet to receive his vision.",
	"Hunger, he had known before, and could withstand it.",
	"His robe shielded him from the cold. But it was thirst...",
	"that tested the strength of his mind, his body and his spirit.",
	"The only vision coming to him was the vision of running water.",
	"Water! Water!",
	"Creator: thank you for making such beautiful water.",
	"Water that I must not drink for another day and night.",
	"I'm seeing a great vision!",
	"I am Hehaka, the EIk.",
	"The one women cannot resist when I sing.",
	"You can drink from this water. So say the spirits.",
	"No, wait!",
	"Uncegila lives there. The snake.",
	"She keeps the water for herself. If you slay her and take her heart...",
	"-I may drink the water? -You may have anything you want.",
	"All I want is to make it one more day and night on this mountain...",
	"and to return with a vision that gives me strong medicine.",
	"Go toward the sun, Two-Legged...",
	"and you will find the cave of a beautiful woman.",
	"Only she has the arrows that can kill Uncegila.",
	"Unceglla was real.",
	"And Hehaka, the Elk, spoke the truth.",
	"lf a man could slay her and take her heart...",
	"he could have all he dreamed of in his life.",
	"I am up here doing my hambleceya.",
	"Seeking a vision, are you?",
	"They all come up here for that. Beggars!",
	"The EIk...",
	"The EIk tells me if I slay Uncegila...",
	"if I slay the water monster, take her heart...",
	"I return with strong medicine and have wisdom and power.",
	"Uncegila.",
	"She can only be killed with the wakan arrows.",
	"I am the keeper of those arrows.",
	"-Have pity on me, Old Woman. -What will you give me...",
	"vision seeker...",
	"for my arrows...",
	"that never...",
	"ever miss?",
	"Remove your fine buffalo robe.",
	"Yes... you can have my robe.",
	"It is not the robe that I desire.",
	"It has been many snows since I've been held by a man...",
	"so young and strong. Please.",
	"-Maybe I don't need the water. -But you need a vision!",
	"I smell Hehaka, the EIk, on you.",
	"Give me pleasure!",
	"Old Woman, please! All I want is...",
	"Don't even think about it!",
	"You did a thing for me.",
	"You have freed me from my old shell. But you wouldn't give me pleasure...",
	"when I was old and ugly, so you will not now that I am young and...",
	"Beautiful.",
	"Your mistake.",
	"The only way to kill Uncegila is to shoot...",
	"one of the four arrows through the seventh spot from her head.",
	"-Seventh spot from her head. -Behind the 7th spot lies her heart.",
	"Take it, but beware. It is Like ice and fire, all at once.",
	"Her heart will speak.",
	"It will ask you to do four things.",
	"You must refuse four times.",
	"After that, do as the heart asks. Is it understood?",
	"And Let no eyes but your own ever look upon the heart...",
	"or it shall be destroyed. And with it...",
	"the powers given to He Who Kills Uncegila.",
	"Many before Eagle Boy had tried to hunt Unceglla.",
	"They were all blind now, or dead.",
	"But Eagle Boy had the four wakan arrows.",
	"And so he waited.",
	"I do not fear you. Come and get me, Uncegila!",
	"Rise from the water! Let me see you, Evil One!",
	"Five, six...",
	"Come back, Uncegila! Do you not see a brave man standing here?",
	"Come back here, Uncegila!",
	"I don't want to say anything, but that is a bummer of a closure.",
	"That ain't the end. Tell him, Grandpa. Tell him what happens.",
	"Does it matter?",
	"Does it matter if the stories are no longer told?",
	"If there is no one to keep the dream?",
	"What did you guys think of Dancing With Wolves?",
	"-What 's up with that, man? -Hang on!",
	"-Rednecks after us? -Indians.",
	"-Indians? We are Indians, aren't we? -Don't Lose my horse!",
	"Dude, this is so not Like what I had in mind. Will you Let me out?",
	"Pull over, Shane!",
	"Victor wants him dead! Shoot that fool!",
	"Shoot the trailer tires!",
	"-Where are they? -In the Rio Grande.",
	"Just get the hell out of here, Shane.",
	"Just go. You've made up, all right? Just go!",
	"Just get out!",
	"You okay?",
	"Hey, you boys! Come on up here!",
	"We're going to the Powwow!",
	"What is that, y'all, up ahead?",
	"-Road kill cafe. -Stop.",
	"Back up.",
	"What 's he doing?",
	"He does this to every dead animal we pass.",
	"He has to honor them.",
	"Been a Long trip, man.",
	"There goes your skin.",
	"Word is traveling... you are no good!",
	"I haven't exactly heard any honoring songs sung for you, Ikto!",
	"Do not despair. Come to my Lodge.",
	"Tonight. My fine wife will cook you dinner.",
	"-You trust me with your wife? -No. But you are my friend...",
	"and I won't watch you turn to ribs and hair.",
	"I will be grateful, Ikto.",
	"When you see the Moon, come to the Lodge of my fat and beautiful woman.",
	"Do not burn them. Coyote Likes them raw.",
	"There are only two Livers here. Where is the third for me?",
	"You will eat what is Left after me and Coyote have feasted.",
	"Leave me alone now.",
	"I will, Fat Woman.",
	"I am going to go out and get a duck. Coyote Likes a nice duck.",
	"Maybe something will be Left over for the poor woman who cooks.",
	"If Coyote should come while I am out hunting...",
	"you be nice to him. But watch out.",
	"Do not Let him eat everything till I get back.",
	"And don't Let him admire your robe...",
	"if you know what I mean!",
	"Go, you Lazy good-for-nothing.",
	"A woman must eat also.",
	"Somebody is here... under the moon.",
	"Come, Sunkamanaitou. Come feast in our Lodge.",
	"-Where is Ikto? -Up to no good.",
	"He always is.",
	"Where's dinner?",
	"It is coming.",
	"Do not move so close.",
	"Why not? Me and Ikto... we share everything.",
	"You're both good-for-nothings. Loafers and cheaters.",
	"He's off chasing a woman now, I think.",
	"You know he is. So Let me...",
	"You're here for dinner. Nothing more.",
	"There were buffalo Livers in here. Cooked and eaten.",
	"Who ate them if not me, and if Ikto is out chasing?",
	"When Ikto returns and sees there is nothing Left to eat...",
	"...I will be in trouble. -Yes, you will be.",
	"I must have two of something cooking in the pan by the time he returns.",
	"-But two of what? -I do not know...",
];

module.exports = lines;
