/*
 * ArkhamHorrorLCG.js
 */

useLibrary( 'extension' );
useLibrary( 'imageutils' );
useLibrary( 'fontutils' );
useLibrary('tints');

useLibrary( 'diy' );
useLibrary( 'ui' );

importClass( arkham.diy.ListItem );
importClass( resources.StrangeImage );
importClass( java.io.File );

useLibrary( 'res://ArkhamHorrorLCG/diy/AHLCG-utilLibrary.js' );
useLibrary( 'res://ArkhamHorrorLCG/diy/AHLCG-preferences.js' );

function() initialize {
	var GameLanguage = Language.getGame();
	var InterfaceLanguage = Language.getInterface();

	InterfaceLanguage.addStrings( 'ArkhamHorrorLCG/text/AHLCG-Interface' );
	GameLanguage.addStrings( 'ArkhamHorrorLCG/text/AHLCG-Game' );

	const ahlcgGame = Game.register(
		'AHLCG', 'AHLCG-ArkhamHorrorLCG', image( 'AHLCG-Game', 'icons', 'png' )
	);

	ahlcgGame.masterSettings.addSettingsFrom('ArkhamHorrorLCG/settings/AHLCG-Game.settings');
	ahlcgGame.masterSettings.addSettingsFrom('ArkhamHorrorLCG/settings/AHLCG-Asset.settings');
	ahlcgGame.masterSettings.addSettingsFrom('ArkhamHorrorLCG/settings/AHLCG-Event.settings');
	ahlcgGame.masterSettings.addSettingsFrom('ArkhamHorrorLCG/settings/AHLCG-Skill.settings');
	ahlcgGame.masterSettings.addSettingsFrom('ArkhamHorrorLCG/settings/AHLCG-Investigator.settings');
	ahlcgGame.masterSettings.addSettingsFrom('ArkhamHorrorLCG/settings/AHLCG-Enemy.settings');
	ahlcgGame.masterSettings.addSettingsFrom('ArkhamHorrorLCG/settings/AHLCG-WeaknessEnemy.settings');
	ahlcgGame.masterSettings.addSettingsFrom('ArkhamHorrorLCG/settings/AHLCG-Treachery.settings');
	ahlcgGame.masterSettings.addSettingsFrom('ArkhamHorrorLCG/settings/AHLCG-WeaknessTreachery.settings');
	ahlcgGame.masterSettings.addSettingsFrom('ArkhamHorrorLCG/settings/AHLCG-Location.settings');
	ahlcgGame.masterSettings.addSettingsFrom('ArkhamHorrorLCG/settings/AHLCG-Agenda.settings');
	ahlcgGame.masterSettings.addSettingsFrom('ArkhamHorrorLCG/settings/AHLCG-Act.settings');
	ahlcgGame.masterSettings.addSettingsFrom('ArkhamHorrorLCG/settings/AHLCG-Chaos.settings');
	ahlcgGame.masterSettings.addSettingsFrom('ArkhamHorrorLCG/settings/AHLCG-AssetStory.settings');
	ahlcgGame.masterSettings.addSettingsFrom('ArkhamHorrorLCG/settings/AHLCG-AgendaPortrait.settings');
	ahlcgGame.masterSettings.addSettingsFrom('ArkhamHorrorLCG/settings/AHLCG-MiniInvestigator.settings');
	ahlcgGame.masterSettings.addSettingsFrom('ArkhamHorrorLCG/settings/AHLCG-Scenario.settings');
	ahlcgGame.masterSettings.addSettingsFrom('ArkhamHorrorLCG/settings/AHLCG-BackPortrait.settings');
	ahlcgGame.masterSettings.addSettingsFrom('ArkhamHorrorLCG/settings/AHLCG-Story.settings');
	ahlcgGame.masterSettings.addSettingsFrom('ArkhamHorrorLCG/settings/AHLCG-Guide75.settings');
	ahlcgGame.masterSettings.addSettingsFrom('ArkhamHorrorLCG/settings/AHLCG-GuideA4.settings');
	ahlcgGame.masterSettings.addSettingsFrom('ArkhamHorrorLCG/settings/AHLCG-Divider.settings');

	Eons.namedObjects.AHLCGObject = new gameObject( ahlcgGame.masterSettings );

	addPreferences();
	
	ClassMap.add( 'ArkhamHorrorLCG/ArkhamHorrorLCG.classmap' );
}

function gameObject( masterSettings ) {
	const registerTTFont = function registerTTFont() {
		for( let i=0; i<arguments.length; ++i ) {
			arguments[i] = 'ArkhamHorrorLCG/fonts/' + arguments[i] + '.ttf';
		}
		return FontUtils.registerFontFamilyFromResources.apply( this, arguments );
	};
	const registerOTFont = function registerOTFont() {
		for( let i=0; i<arguments.length; ++i ) {
			arguments[i] = 'ArkhamHorrorLCG/fonts/' + arguments[i] + '.otf';
		}
		return FontUtils.registerFontFamilyFromResources.apply( this, arguments );
	};

	var locale = getLocale();
	var titleFontFamily = 'Teutonic';
	
	if ( locale == 'cs' ) {
		titleFontFamily = ResourceKit.findAvailableFontFamily( 'Adobe Garamond Pro, Times New Roman', 'Teutonic' );
	}	
	else {
		titleFontFamily = 'Teutonic';
	}
	
	if ( titleFontFamily == 'Teutonic' ) this.titleFamily = registerTTFont( 'Teutonic' );
	else this.titleFamily = titleFontFamily;

	var fontFamily = ResourceKit.findAvailableFontFamily( 'Arno Pro, Times New Roman', 'NimbusRomNo9L' );
//	var fontFamily = ResourceKit.findAvailableFontFamily( 'Times New Roman', 'NimbusRomNo9L' );

	this.bodyFontTightness = 0.64;
	this.bodyFontSize = 7.8;
	this.bodyFontSpacing = 0.97;
	this.bodyTraitSize = 7;
	this.bodyTraitSpacing = 0.97;
	this.bodyFlavorSize = 7.0;
	this.bodyFlavorSpacing = 0.92;
	this.bodyStorySize = 7.8;
	this.bodyStorySpacing = 0.92;
	this.collectionSize = 4.0;
	this.subtitleSize = 6.0;
	this.smallLabelSize = 4.7;
	this.largeLabelSize = 6.2;
	this.subtypeSize = 5.5;
	this.subtitleFontSpacing = 1.0;
	this.scenarioIndexSize = 6.5;
	this.scenarioIndexBackSize = 4.4;
	this.difficultySize = 5.8;
	
	if (fontFamily == 'Arno Pro') {
		this.bodyFamily = 'Arno Pro';

		this.bodyFontTightness = 0.57;
		this.bodyFontSize = this.bodyFontSize * 1.08;
		this.bodyTraitSize = this.bodyTraitSize * 1.12;
		this.bodyFlavorSize = this.bodyFlavorSize * 1.12;
		this.bodyStorySize = this.bodyStorySize * 1.12;
		this.subtitleSize = this.subtitleSize * 1.08;
		this.smallLabelSize = this.smallLabelSize * 1.08;
		this.largeLabelSize = this.largeLabelSize * 1.08;
		this.subtypeSize = this.subtypeSize * 1.08;
		this.collectionSize = this.collectionSize * 1.12;
		this.bodyFlavorSpacing = 0.96;
		this.subtitleFontSpacing = 0.97;
		this.scenarioIndexSize = this.scenarioIndexSize * 1.08;
		this.scenarioIndexBackSize = this.scenarioIndexBackSize * 1.08;
		this.difficultySize = this.difficultySize * 1.08;		
	}
	else if (fontFamily == 'Times New Roman') this.bodyFamily = 'Times New Roman';
	else this.bodyFamily = registerOTFont( 'NimbusRomNo9L-Med', 'NimbusRomNo9L-MedIta', 'NimbusRomNo9L-Reg', 'NimbusRomNo9L-RegIta' );

	this.skillFamily = registerTTFont( 'Bolton', 'BoltonBold' );
	this.symbolFamily = registerTTFont( 'AHLCGSymbol');
	
	this.costFont = ResourceKit.getFont('ArkhamHorrorLCG/fonts/Teutonic.ttf', 16.0);
	this.enemyFont = ResourceKit.getFont('ArkhamHorrorLCG/fonts/Bolton.ttf', 16.0);
	this.symbolFont = ResourceKit.getFont('ArkhamHorrorLCG/fonts/AHLCGSymbol.ttf', 16.0);
//	this.headerFont = ResourceKit.getFont('ArkhamHorrorLCG/fonts/AHLCGSymbol.ttf', 11.2);
	this.chaosFont = ResourceKit.getFont('ArkhamHorrorLCG/fonts/AHLCGSymbol.ttf', 14.0);

	// updated arrays for language support
	this.comboClasses = new Array( 
		ListItem( 'Guardian', @AHLCG-Class-Guardian ),
		ListItem( 'Seeker', @AHLCG-Class-Seeker ),
		ListItem( 'Rogue', @AHLCG-Class-Rogue ),
		ListItem( 'Mystic', @AHLCG-Class-Mystic ),
		ListItem( 'Survivor', @AHLCG-Class-Survivor ),
		ListItem( 'Neutral', @AHLCG-Class-Neutral ) );
		
	this.comboClassesBW = new Array( 
		ListItem( 'Guardian', @AHLCG-Class-Guardian ),
		ListItem( 'Seeker', @AHLCG-Class-Seeker ),
		ListItem( 'Rogue', @AHLCG-Class-Rogue ),
		ListItem( 'Mystic', @AHLCG-Class-Mystic ),
		ListItem( 'Survivor', @AHLCG-Class-Survivor ),
		ListItem( 'Neutral' , @AHLCG-Class-Neutral ),
		ListItem( 'Weakness' , @AHLCG-Class-Weakness ),
		ListItem( 'BasicWeakness', @AHLCG-Class-BasicWeakness ) );
	
	this.comboClassesW = new Array( 
		ListItem( 'Guardian', @AHLCG-Class-Guardian ),
		ListItem( 'Seeker', @AHLCG-Class-Seeker ),
		ListItem( 'Rogue', @AHLCG-Class-Rogue ),
		ListItem( 'Mystic', @AHLCG-Class-Mystic ),
		ListItem( 'Survivor', @AHLCG-Class-Survivor ),
		ListItem( 'Neutral' , @AHLCG-Class-Neutral ),
		ListItem( 'Weakness' , @AHLCG-Class-Weakness ) );
		
	this.comboClassesD = new Array( 
		ListItem( 'None', @AHLCG-Class-None ),
		ListItem( 'Guardian', @AHLCG-Class-Guardian ),
		ListItem( 'Seeker', @AHLCG-Class-Seeker ),
		ListItem( 'Rogue', @AHLCG-Class-Rogue ),
		ListItem( 'Mystic', @AHLCG-Class-Mystic ),
		ListItem( 'Survivor', @AHLCG-Class-Survivor ) );

	this.comboStoryAssetClasses = new Array( 
		ListItem( 'Neutral', @AHLCG-Class-Neutral ),
		ListItem( 'Weakness', @AHLCG-Class-Weakness ) );

	this.comboSkills = new Array( 
		ListItem( 'None', @AHLCG-Skill-None ),
		ListItem( 'Willpower', @AHLCG-Skill-Willpower ),
		ListItem( 'Intellect', @AHLCG-Skill-Intellect ),
		ListItem( 'Combat', @AHLCG-Skill-Combat ),
		ListItem( 'Agility', @AHLCG-Skill-Agility ),
		ListItem( 'Wild' , @AHLCG-Skill-Wild ) );
		
	this.comboSlots = new Array( 
		ListItem( 'None', @AHLCG-Slot-None ),
		ListItem( 'Ally', @AHLCG-Slot-Ally ),
		ListItem( 'Accessory', @AHLCG-Slot-Accessory ),
		ListItem( 'Body', @AHLCG-Slot-Body ),
		ListItem( '1 Hand', @AHLCG-Slot-1Hand ),
		ListItem( '2 Hands', @AHLCG-Slot-2Hands ),
		ListItem( '1 Arcane', @AHLCG-Slot-1Arcane ),
		ListItem( '2 Arcane' , @AHLCG-Slot-2Arcane ),
		ListItem( 'Tarot', @AHLCG-Slot-Tarot ) );

	this.comboWeaknessTypes = new Array( 
		ListItem( 'BasicWeakness', @AHLCG-WknType-BasicWeakness ), 
		ListItem( 'Weakness', @AHLCG-WknType-Weakness ),
		ListItem( 'StoryWeakness', @AHLCG-WknType-StoryWeakness ) );

	this.comboWeaknessTypesI = new Array( 
		ListItem( 'BasicWeakness', @AHLCG-WknType-BasicWeakness ), 
		ListItem( 'Weakness', @AHLCG-WknType-Weakness ),
		ListItem( 'InvestigatorWeakness', @AHLCG-WknType-InvestigatorWeakness ),
		ListItem( 'StoryWeakness', @AHLCG-WknType-StoryWeakness ) );

	this.comboScenario = new Array( 
		ListItem( 'Portrait', @AHLCG-Scenario-Portrait ),
		ListItem( 'Title', @AHLCG-Scenario-Title ),
		ListItem( 'Resolution', @AHLCG-Scenario-Resolution ) );
				
	this.comboBacks = new Array( 
		ListItem( 'Player', @AHLCG-Back-Player ),
		ListItem( 'Encounter', @AHLCG-Back-Encounter ) );

	this.comboLocationBacks = new Array( 
		ListItem( 'Standard', @AHLCG-Back-Standard ),
		ListItem( 'Player', @AHLCG-Back-Player ),
		ListItem( 'Encounter', @AHLCG-Back-Encounter ) );

	this.comboGuide = new Array( 
		ListItem( 'Title', @AHLCG-Guide-Title ),
		ListItem( 'Empty', @AHLCG-Guide-Empty ) );

	this.comboTemplateOrientation = new Array( 
		ListItem( 'Standard', @AHLCG-Orientation-Standard ),
		ListItem( 'Reversed', @AHLCG-Orientation-Reversed ) );

	this.comboLevelsN = new Array(
		ListItem( 'None', @AHLCG-Level-None ) );
	for( let index = 0; index <= 5; index++ ){
		this.comboLevelsN[this.comboLevelsN.length] = ListItem( index, String(index) );
	}
								
	this.comboPortraitPosition1 = new Array( 
		ListItem( 'None', @AHLCG-Guide-None ),
		ListItem( 'TopLeftSmall', @AHLCG-Guide-TopLeftSmall ),
		ListItem( 'TopLeftMedium', @AHLCG-Guide-TopLeftMedium ),
		ListItem( 'TopLarge', @AHLCG-Guide-TopLarge ),
		ListItem( 'BottomLeftSmall', @AHLCG-Guide-BottomLeftSmall ),
		ListItem( 'BottomLeftMedium', @AHLCG-Guide-BottomLeftMedium ),
		ListItem( 'BottomLarge', @AHLCG-Guide-BottomLarge ),
		ListItem( 'LeftLarge', @AHLCG-Guide-LeftLarge ),
		ListItem( 'TopLeftCorner', @AHLCG-Guide-TopLeftCorner ),
		ListItem( 'BottomLeftCorner', @AHLCG-Guide-BottomLeftCorner ) );

	this.comboPortraitPosition2 = new Array( 	
		ListItem( 'None', @AHLCG-Guide-None ),
		ListItem( 'TopRightSmall', @AHLCG-Guide-TopRightSmall ),
		ListItem( 'TopRightMedium', @AHLCG-Guide-TopRightMedium ),
		ListItem( 'TopLarge', @AHLCG-Guide-TopLarge ),
		ListItem( 'BottomRightSmall', @AHLCG-Guide-BottomRightSmall ),
		ListItem( 'BottomRightMedium', @AHLCG-Guide-BottomRightMedium ),
		ListItem( 'BottomLarge', @AHLCG-Guide-BottomLarge ),
		ListItem( 'RightLarge', @AHLCG-Guide-RightLarge ),
		ListItem( 'TopRightCorner', @AHLCG-Guide-TopRightCorner ),
		ListItem( 'BottomRightCorner', @AHLCG-Guide-BottomRightCorner ) );

	this.comboStat = new Array();
	for( let index = 0; index <= 6; index++ ){
		this.comboStat[this.comboStat.length] = ListItem( index, String(index) );
	}

	this.comboInvestigatorHealth = new Array();
	for( let index = 1; index <= 15; index++ ){
		this.comboInvestigatorHealth[this.comboInvestigatorHealth.length] = ListItem( index, String(index) );
	}

	this.comboAssetStamina = new Array(
		ListItem( 'None', @AHLCG-Stamina-None ), 
		ListItem( '-', '-' ) );
	for( let index = 1; index <= 15; index++ ){
		this.comboAssetStamina[this.comboAssetStamina.length] = ListItem( index, String(index) );
	}

	this.comboAssetSanity = new Array(
		ListItem( 'None', @AHLCG-Sanity-None ), 
		ListItem( '-', '-' ) );
	for( let index = 1; index <= 15; index++ ){
		this.comboAssetSanity[this.comboAssetSanity.length] = ListItem( index, String(index) );
	}

	this.comboEnemyStat = new Array(
		ListItem( '-', '-' ),
		ListItem( '?', '?' ),
		ListItem( 'X', 'X' ) );
	for( let index = 0; index <= 9; index++ ){
		this.comboEnemyStat[this.comboEnemyStat.length] = ListItem( index, String(index) );
	}

	this.comboEnemyHealth = new Array(
		ListItem( '-', '-' ),
		ListItem( '?', '?' ),
		ListItem( 'X', 'X' ) );
	for( let index = 0; index <= 19; index++ ){
		this.comboEnemyHealth[this.comboEnemyHealth.length] = ListItem( index, String(index) );
	}

	this.comboCost = new Array(
		ListItem( '-', '-' ),
		ListItem( 'X', 'X' ) );
	for( let index = 0; index <= 19; index++ ) {
		this.comboCost[this.comboCost.length] = ListItem( index, String(index) );
	}
	
	this.comboClues = new Array(
	ListItem( '-', '-' ),
	ListItem( '?', '?' ) );
	for( let index = 1; index <= 19; index++ ) {
		this.comboClues[this.comboClues.length] = ListItem( index, String(index) );
	}
	
	this.combo5 = new Array();
	for( let index = 0; index <= 5; index++ ){
		this.combo5[index] = ListItem( index, String(index) );
	}

	this.combo20 = new Array();
	for( let index = 0; index < 20; index++ ){
		this.combo20[index] = ListItem( index+1, String(index+1) );
	}

	this.comboX20 = new Array(
		ListItem( 'X', 'X' )
	);
	for( let index = 0; index <= 20; index++ ){
		this.comboX20[this.comboX20.length] = ListItem( index, String(index) );
	}

	this.basicEncounterList = new Array(
		'CustomEncounterSet',
		'StrangeEons'
	);

	// Highest = 198
	// NameKey, CollectionID, Tag, Index into select keys
	this.standardEncounterList = new Array(
		// Core Set
		[ 'TheGathering', 0, 'gather', 26 ],
		[ 'TheMidnightMasks', 0, 'midmsk', 28 ],
		[ 'CultOfUmordhoth', 0, 'cltumh', 10 ],
		[ 'TheDevourerBelow', 0, 'devbel', 24 ],
		[ 'Rats', 0, 'rats', 19 ],
		[ 'Ghouls', 0, 'ghouls', 14 ],
		[ 'StrikingFear', 0, 'strfr', 21 ],
		[ 'AncientEvils', 0, 'ancevl', 4 ],
		[ 'ChillingCold', 0, 'chlcld', 9 ],
		[ 'DarkCult', 0, 'dkcult', 12 ],
		[ 'Nightgaunts', 0, 'ntgnts', 18 ],
		[ 'LockedDoors', 0, 'lckdrs', 16 ],
		[ 'AgentsOfHastur', 0, 'agthas', 1 ],
		[ 'AgentsOfYogSothoth', 0, 'agtyog', 3 ],
		[ 'AgentsOfShubNiggurath', 0, 'agtshb', 2 ],
		[ 'AgentsOfCthulhu', 0, 'agtcth', 0 ],

		// The Dunwich Legacy
		[ 'ArmitagesFate', 1, 'armfat', 5 ],
		[ 'ExtracurricularActivity', 1, 'extact', 13 ],
		[ 'TheHouseAlwaysWins', 1, 'hsewin', 27 ],
		[ 'Sorcery', 1, 'sorcry', 20 ],
		[ 'BishopsThralls', 1, 'bpthrl', 7 ],
		[ 'Dunwich', 1, 'dunwch', 32 ],
		[ 'Whippoorwills', 1, 'whip', 30 ],
		[ 'BadLuck', 1, 'badlck', 6 ],
		[ 'BeastThralls', 1, 'bstthrl', 33 ],
		[ 'NaomisCrew', 1, 'naocrw', 17 ],
		[ 'TheBeyond', 1, 'beyond', 23 ],
		[ 'HideousAbominations', 1, 'hidabo', 15 ],
		[ 'TheMiskatonicMuseum', 1, 'mskmus', 29 ],
		[ 'TheEssexCountyExpress', 1, 'esxexp', 25 ],
		[ 'BloodOnTheAltar', 1, 'bldalt', 31 ],
		[ 'UndimensionedAndUnseen', 1, 'undim', 34 ],
		[ 'WhereDoomAwaits', 1, 'wda', 35 ],
		[ 'LostInTimeAndSpace', 1, 'litas', 36 ],

		// Curse Of The Rougarou
		[ 'CurseOfTheRougarouE', 2, 'currou', 11 ],
		[ 'TheBayou', 2, 'bayou', 22 ],

		// CarnevaleOfHorrors
		[ 'CarnevaleOfHorrorsE', 3, 'carhor', 8 ],

		// The Path to Carcosa
		[ 'CurtainCall', 4, 'curtncl', 38 ],
		[ 'TheLastKing', 4, 'lstkng', 44 ],
		[ 'Delusions', 4, 'delusn', 40 ],
		[ 'Byakhee', 4, 'byak', 48 ],
		[ 'InhabitantsOfCarcosa', 4, 'inhcar', 49 ],
		[ 'EvilPortents', 4, 'evilpor', 41 ],
		[ 'Hauntings', 4, 'haunt', 43 ],
		[ 'HastursGift', 4, 'hasgft', 42 ],
		[ 'CultOfTheYellowSign', 4, 'cltyel', 37 ],
		[ 'DecayAndFilth', 4, 'decay', 39 ],
		[ 'TheStranger', 4, 'strngr', 45 ],
		[ 'EchoesOfThePast', 4, 'echoes', 46 ],
		[ 'TheUnspeakableOath', 4, 'unspk', 47 ],
		[ 'APhantomOfTruth', 4, 'phntm', 50 ],
		[ 'ThePallidMask', 4, 'palmsk', 51 ],
		[ 'BlackStarsRise', 4, 'bsr', 52 ],
		[ 'TheFloodBelow', 4, 'flood', 53 ],
		[ 'TheVortexAbove', 4, 'vortex', 54 ],
		[ 'DimCarcosa', 4, 'dimcar', 55 ],

		// The Forgotten Age
		[ 'TheUntamedWilds', 5, 'untmdwld', 67 ],
		[ 'TheDoomOfEztli', 5, 'dmeztli', 66 ],
		[ 'Rainforest', 5, 'rainfst', 63 ],
		[ 'Serpents', 5, 'serpent', 64 ],
		[ 'Expedition', 5, 'exped', 58 ],
		[ 'AgentsOfYig', 5, 'agtyig', 56 ],
		[ 'GuardiansOfTime', 5, 'guatim', 60 ],
		[ 'DeadlyTraps', 5, 'deadtrp', 57 ],
		[ 'TemporalFlux', 5, 'temflx', 65 ],
		[ 'ForgottenRuins', 5, 'fruins', 59 ],
		[ 'PnakoticBrotherhood', 5, 'pnabro', 61 ],
		[ 'YigsVenom', 5, 'yigvnm', 68 ],
		[ 'Poison', 5, 'poison', 62 ],
		[ 'ThreadsOfFate', 5, 'tof', 69 ],
		[ 'TheBoundaryBeyond', 5, 'bndry', 70 ],
		[ 'HeartOfTheElders', 5, 'hrteld', 71 ],
		[ 'PillarsOfJudgment', 5, 'piljdg', 72 ],
		[ 'KnYan', 5, 'knyan', 73 ],
		[ 'TheCityOfArchives', 5, 'ctyarc', 75 ],
		[ 'TheDepthsOfYoth', 5, 'tdoy', 74 ],
		[ 'ShatteredAeons', 5, 'shaaon', 76 ],
		[ 'TurnBackTime', 5, 'tbt', 77 ],

		// The Labyrinths Of Lunacy
		[ 'TheLabyrinthsOfLunacyE', 6, 'lablun', 78 ],
		[ 'EpicMultiplayer', 6, 'epicmp', 79 ],
		[ 'SingleGroup', 6, 'singrp', 80 ],

		// Return to the Night of the Zealot
		[ 'ReturnToTheGathering', 7, 'rgather', 84 ],
		[ 'ReturnToTheMidnightMasks', 7, 'rmidmsk', 85 ],
		[ 'ReturnToTheDevourerBelow', 7, 'rdevbel', 83 ],
		[ 'GhoulsOfUmordhoth', 7, 'ghoum', 82 ],
		[ 'TheDevourersCult', 7, 'devclt', 86 ],
		[ 'ReturnToCultOfUmordhoth', 7, 'cltumhr', 81 ],

		// Guardians of the Abyss
		[ 'TheEternalSlumber', 8, 'eslmbr', 91 ],
		[ 'TheNightsUsurper', 8, 'ntusrpr', 92 ],
		[ 'BrotherhoodOfTheBeast', 8, 'bhdbst', 89 ],
		[ 'SandsOfEgypt', 8, 'sdsegpt', 90 ],
		[ 'AbyssalTribute', 8, 'abytrib', 88 ],
		[ 'AbyssalGifts', 8, 'abygfts', 87 ],

		// Return to the Dunwich Legacy
		[ 'ReturnToExtracurricularActivities', 9, 'rextact', 98 ],
		[ 'ReturnToTheHouseAlwaysWins', 9, 'rhsewin', 101 ],
		[ 'ReturnToTheMiskatonicMuseum', 9, 'rmskmus', 102 ],
		[ 'ReturnToTheEssexCountyExpress', 9, 'resxexp', 100 ],
		[ 'ReturnToBloodOnTheAltar', 9, 'rbldalt', 97 ],
		[ 'ReturnToUndimensionedAndUnseen', 9, 'rundim', 103 ],
		[ 'ReturnToWhereDoomAwaits', 9, 'rtwda', 104 ],
		[ 'ReturnToLostInTimeAndSpace', 9, 'rtlitas', 98 ],
		[ 'BeyondTheThreshold', 9, 'byndthr', 93 ],
		[ 'ResurgentEvils', 9, 'resevl', 96 ],
		[ 'SecretDoors', 9, 'scrtdr', 105 ],
		[ 'CreepingCold', 9, 'crpcld', 94 ],
		[ 'ErraticFear', 9, 'errfr', 95 ],
		[ 'YogSothothsEmissaries', 9, 'yogem', 106 ],

		// The Circle Undone
		[ 'DisappearanceAtTheTwilightEstate', 10, 'datte', 112 ],
		[ 'TheWitchingHour', 10, 'wtchhr', 124 ],
		[ 'AtDeathsDoorstep', 10, 'atdths', 109 ],
		[ 'TheWatcher', 10, 'watcher', 123 ],
		[ 'AgentsOfAzathoth', 10, 'agtaz', 107 ],
		[ 'AnettesCoven', 10, 'anette', 108 ],
		[ 'Witchcraft', 10, 'witch', 127 ],
		[ 'SilverTwilightLodge', 10, 'siltwil', 119 ],
		[ 'CityOfSins', 10, 'ctysins', 111 ],
		[ 'SpectralPredators', 10, 'specpred', 120 ],
		[ 'TrappedSpirits', 10, 'trpspi', 125 ],
		[ 'RealmOfDeath', 10, 'rlmdth', 117 ],
		[ 'InexorableFate', 10, 'inexft', 114 ],
		[ 'TheSecretName', 10, 'secrtnm', 121 ],
		[ 'TheWagesOfSin', 10, 'twos', 122 ],
		[ 'ForTheGreaterGood', 10, 'ftgg', 113 ],
		[ 'UnionAndDisillusion', 10, 'undis', 126 ],
		[ 'MusicOfTheDamned', 10, 'motd', 116 ],
		[ 'SecretsOfTheUniverse', 10, 'sotu', 118 ],
		[ 'InTheClutchesOfChaos', 10, 'itcoc', 115 ],
		[ 'BeforeTheBlackThrone', 10, 'btbt', 110 ],

		// Return to the Path to Carcosa
		[ 'DecayingReality', 11, 'decrea', 128 ],
		[ 'DelusoryEvils', 11, 'delevl', 129 ],
		[ 'HastursEnvoys', 11, 'hasenv', 130 ],
		[ 'MaddeningDelusions', 11, 'maddel', 131 ],
		[ 'NeuroticFear', 11, 'neufr', 132 ],
		[ 'ReturnToAPhantomOfTruth', 11, 'rphntm', 133 ],
		[ 'ReturnToBlackStarsRise', 11, 'rbsr', 134 ],
		[ 'ReturnToCurtainCall', 11, 'rcurtncl', 135 ],
		[ 'ReturnToDimCarcosa', 11, 'rdimcar', 136 ],
		[ 'ReturnToEchoesOfThePast', 11, 'rechoes', 137 ],
		[ 'ReturnToTheLastKing', 11, 'rlstkng', 138 ],
		[ 'ReturnToThePallidMask', 11, 'rpalmsk', 139 ],
		[ 'ReturnToTheUnspeakableOath', 11, 'runspk', 140 ],

		// The Dream-Eaters
		[ 'BeyondTheGatesOfSleep', 12, 'beyondthegatesofsleep', 141 ],
		[ 'WakingNightmare', 12, 'wakingnightmare', 142 ],
		[ 'AgentsOfAtlachNacha', 12, 'agentsofatlachnacha', 143 ],
		[ 'AgentsOfNyarlathotep', 12, 'agentsofnyarlathotep', 144 ],
		[ 'CreaturesOfTheUnderworld', 12, 'creaturesoftheunderworld', 145 ],
		[ 'DreamersCurse', 12, 'dreamerscurse', 146 ],
		[ 'Dreamlands', 12, 'dreamlands', 147 ],
		[ 'MergingRealities', 12, 'mergingrealities', 148 ],
		[ 'Spiders', 12, 'spiders', 149 ],
		[ 'Corsairs', 12, 'corsairs', 150 ],
		[ 'WhispersOfHypnos', 12, 'whispersofhypnos', 151 ],
		[ 'Zoogs', 12, 'zoogs', 152 ],
		[ 'TheSearchForKadath', 12, 'thesearchforkadath', 153 ],
		[ 'DarkSideOfTheMoon', 12, 'darksideofthemoon', 154 ],
		[ 'AThousandShapesOfHorror', 12, 'athousandshapesofhorror', 155 ],
		[ 'PointOfNoReturn', 12, 'pointofnoreturn', 156 ],
		[ 'TerrorOfTheVale', 12, 'terrorofthevale', 157 ],
		[ 'DescentIntoThePitch', 12, 'descentintothepitch', 158 ],
		[ 'WhereTheGodsDwell', 12, 'wherethegodsdwell', 159 ],
		[ 'WeaverOfTheCosmos', 12, 'weaverofthecosmos', 160 ],

		// Murder At The Excelsior Hotel
		[ 'MurderAtTheExcelsiorHotelE', 13, 'murderattheexcelsiorhotele', 161 ],
		[ 'AlienInterference', 13, 'alieninterference', 162 ],
		[ 'ExcelsiorManagement', 13, 'excelsiormanagement', 163 ],
		[ 'DarkRituals', 13, 'darkrituals', 164 ],
		[ 'VileExperiments', 13, 'vileexperiments', 165 ],
		[ 'SinsOfThePast', 13, 'sinsofthepast', 166 ],

		// Parellel Investigators
		[ 'ReadOrDie', 14, 'readordie', 167 ],
		[ 'AllOrNothing', 14, 'allornothing', 168 ],

		// The Blob That Ate Everything
		[ 'TheBlobThatAteEverythingE', 15, 'theblobthatateeverythinge', 169 ],
		[ 'MiGoIncursion', 15, 'migoincursion', 170 ],

		// Return To The Forgotten Age
		[ 'ReturnToTheUntamedWilds', 16, 'returntotheuntamedwilds', 171 ],
		[ 'ReturnToTheDoomOfEztli', 16, 'returntothedoomofeztli', 172 ],
		[ 'ReturnToThreadsOfFate', 16, 'returntothreadsoffate', 173 ],
		[ 'ReturnToTheBoundaryBeyond', 16, 'returntotheboundarybeyond', 174 ],
		[ 'ReturnToHeartOfTheElders', 16, 'returntoheartoftheelders', 175 ],
		[ 'ReturnToPillarsOfJudgment', 16, 'returntopillarsofjudgment', 176 ],
		[ 'ReturnToKnYan', 16, 'returntoknyan', 177 ],
		[ 'ReturnToTheCityOfArchives', 16, 'returntothecityofarchives', 178 ],
		[ 'ReturnToTheDepthsOfYoth', 16, 'returntothedepthsofyoth', 179 ],
		[ 'ReturnToShatteredAeons', 16, 'returntoshatteredaeons', 180 ],
		[ 'ReturnToTurnBackTime', 16, 'returntoturnbacktime', 181 ],
		[ 'ReturnToTheRainforest', 16, 'returntotherainforest', 182 ],
		[ 'CultOfPnakotus', 16, 'cultofpnakotus', 183 ],
		[ 'DoomedExpedition', 16, 'doomedexpedition', 184 ],
		[ 'TemporalHunters', 16, 'temporalhunters', 185 ],
		[ 'VenomousHate', 16, 'venomoushate', 186 ],

		// The Innsmouth Conspiricy
		[ 'ShatteredMemories', 22, 'shatteredmemories', 187 ],
		[ 'DisappearanceOfElinaHarper', 22, 'disappearanceofelinaharper', 188 ],
		[ 'AgentsOfDagon', 22, 'agentsofdagon', 189 ],
		[ 'AgentsOfHydra', 22, 'agentsofhydra', 190 ],
		[ 'CreaturesFromBelow', 22, 'creaturesfrombelow', 191 ],
		[ 'FloodedCaves', 22, 'floodedcaves', 192 ],
		[ 'FogOverInnsmouth', 22, 'fogoverinnsmouth', 193 ],
		[ 'GrottoOfDespair', 22, 'grottoofdespair', 194 ],
		[ 'Locals', 22, 'locals', 195 ],
		[ 'Malfunction', 22, 'malfunction', 196 ],
		[ 'RisingTide', 22, 'risingtide', 197 ],
		[ 'Syzygy', 22, 'syzygy', 198 ]
	);

	this.basicCollectionList = new Array(
		'CustomCollection',
		'StrangeEons'
	);

	this.standardCollectionList = new Array(
		[ 'CoreSet', 'core' ],							//  0
		[ 'TheDunwichLegacy', 'dunleg' ],				//  1
		[ 'CurseOfTheRougarou', 'ccurrou' ],			//  2
		[ 'CarnevaleOfHorrors', 'ccarhor' ],			//  3
		[ 'ThePathToCarcosa', 'carcosa' ],				//  4
		[ 'TheForgottenAge', 'forage' ],				//  5
		[ 'TheLabyrinthsOfLunacy', 'lablun' ],			//  6
		[ 'ReturnToTheNightOfTheZealot', 'rtnotz' ],	//  7
		[ 'GuardiansOfTheAbyss', 'guaaby' ],			//  8
		[ 'ReturnToTheDunwichLegacy', 'rttdl' ],		//  9
		[ 'TheCircleUndone', 'cirund' ],				// 10
		[ 'ReturnToThePathToCarcosa', 'rttptc' ],		// 11
		[ 'TheDreamEaters', 'dreeat' ],					// 12
		[ 'MurderAtTheExcelsiorHotel', 'mateh' ],		// 13
		[ 'ParallelInvestigators', 'parallel' ],		// 14
		[ 'TheBlobThatAteEverything', 'blob' ],			// 15
		[ 'ReturnToTheForgottenAge', 'rttfa' ],			// 16
		[ 'NathanielCho', 'nathanielcho' ],				// 17
		[ 'HarveyWalters', 'harveywalters' ],			// 18
		[ 'WinifredHabbamock', 'winifredhabbamock' ],	// 19
		[ 'JacquelineFine', 'jacquelinefine' ],			// 20
		[ 'StellaClark', 'stellaclark' ],				// 21
		[ 'TheInnsmouthConspiracy', 'theinnsmouthconspiracy' ]	// 22
	);

	this.encounterTypes = new Array();
	this.collectionTypes = new Array();

	updateUsedEncounterSets( this );
	updateUsedCollections( this );
						
	this.TagList = new Array (
		'Fast', 'Name', 'HorizontalSpacer', 'LargeVerticalSpacer', 'VerticalSpacer', 
		'SmallVerticalSpacer', 'Action', 'Reaction', 'Fast',
		'Guardian', 'Seeker', 'Rogue', 'Mystic', 'Survivor',
		'Willpower', 'Intellect', 'Combat', 'Agility', 'Wild',
		'Skull', 'Cultist', 'Artifact', 'Monster', 'ElderSign', 'Tentacle',
		'Unique', 'PerInvestigator', 'Prey', 'Spawn', 'Revelation', 'Forced',
		'Objective', 'Haunted', 'Bullet', 'Resolution', 'EndResolution', 'GuideBullet'
	);
	
	this.StyleList = new Array (
		'Trait', 'TraitSection', 'FlavorSection', 'InvStorySection', 
		'ActStorySection', 'AgendaStorySection',
		'AHF'
	);

	this.GuideStyleList = new Array (
		'GuideSection', 'GuideHeader', 'GuideBoxBullet'
	);

	this.CopyrightTagList = new Array (
		'Copyright'
	);

	this.locationIcons = [ 'Circle', 'Square', 'Triangle', 'Cross', 'Diamond', 
		'Slash', 'T', 'Hourglass', 'Moon', 'DoubleSlash', 'Heart', 'Star', 'Quote', 'Clover' ];

	this.comboConnections = new Array (
		ListItem( 'None', @AHLCG-LocIcon-None,
			ImageUtils.createIcon(ImageUtils.get('ArkhamHorrorLCG/images/empty1x1.png') , 12, 12 )
			),
		ListItem( 'Empty', @AHLCG-LocIcon-Empty,
			ImageUtils.createIcon(ImageUtils.get('ArkhamHorrorLCG/images/empty1x1.png') , 12, 12 )
			) 
		);
	
	this.comboConnectionsBack = [ 
		ListItem( 'Copy front', @AHLCG-LocIcon-CopyFront,
			ImageUtils.createIcon(ImageUtils.get('ArkhamHorrorLCG/images/empty1x1.png') , 12, 12 )
			),
		ListItem( 'None', @AHLCG-LocIcon-None,
			ImageUtils.createIcon(ImageUtils.get('ArkhamHorrorLCG/images/empty1x1.png') , 12, 12 )
			),
		ListItem( 'Empty', @AHLCG-LocIcon-Empty,
			ImageUtils.createIcon(ImageUtils.get('ArkhamHorrorLCG/images/empty1x1.png') , 12, 12 )
			)
		];

	this.baseLocationIcon = ImageUtils.get( 'ArkhamHorrorLCG/icons/AHLCG-LocationBase.png' );

	test_tinter = new TintCache( new TintFilter(), this.baseLocationIcon );

	for( let index = 0; index < this.locationIcons.length; index++ ) {
		let item = this.locationIcons[index];
		
		var hsb = masterSettings.getTint( 'AHLCG-' + item + '-tint' );
		test_tinter.setFactors( hsb[0], hsb[1], hsb[2] );

		let iconBaseImage = test_tinter.getTintedImage();
		
		let ig = iconBaseImage.createGraphics();

		ig.drawImage( ImageUtils.get( 'ArkhamHorrorLCG/icons/AHLCG-Loc' + item + '.png' ), 4, 4, null );

		this.comboConnections[index+2] = ListItem(
			item, @('AHLCG-LocIcon-' + item),
			ImageUtils.createIcon(iconBaseImage, 12, 12)		
			);
				
		this.comboConnectionsBack[index+3] = ListItem(
			item, @('AHLCG-LocIcon-' + item),
			ImageUtils.createIcon(iconBaseImage, 12, 12)		
			);

		ig.dispose();
	}	
}