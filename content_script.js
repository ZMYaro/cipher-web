'use strict';

// Cipher Web extension written by Zachary Yaro.
// Based on http://stackoverflow.com/questions/5904914/javascript-regex-to-replace-text-not-in-html-attributes/5904945#5904945.

var TYPES = {
	ELEMENT: 1,
	DOCUMENT: 9,
	DOCUMENT_FRAGMENT: 11,
	TEXT_NODE: 3
};

var nameRegEx = /\bMario Chuman\b/gi;

var quotes = [
	'I HATE that!',
	'You can\'t say \u2018penis\u2019 to a cat',
	'There\'s always a mess after I leave the bathroom anyway',
	'I\'m not a vampire; I don\'t sparkle when touched by light',
	'Your ass is making me numb',
	'I am a dick',
	'Why do people take a shower in places that they shouldn\'t be?',
	'I have no dumb tweets',
	'It\'s a coincidence, I swear!',
	'I will never ever tell anyone that their opinion is wrong',
	'That never happened',
	'Contrary to what you may believe, I am not swimming in dates',
	'There\'s TWO windows for porn',
	'I\'m going to ravish this up and sniff the shit out of it',
	'I don\'t have a response to that',
	'You\'re talking to an expert in this field, whichever field this is',
	'Putting on pants is the hardest part of my day',
	'Hitler looks badass in sunglasses',
	'If you throw confetti at me, I\'ll pretty much do whatever you want me to do',
	'Grabbing my pec, it\'s something, but it\'s not the real deal',
	'My penis does NOT shine and sparkle',
	'I would volunteer my bones in order to make a bridge',
	'I like talking about masturbation',
	'I have never felt the need to kill innocent people on a mass basis',
	'It doesn\'t make me hard; it makes me appreciate beauty',
	'Capitalism is the way Darwin intended it to be',
	'If two people smile at each other in a dystopian novel, they\'re gonna fuck',
	'WHY ARE THERE NUMBERS ON THESE DICE?',
	'\u2018Semen sock\u2019 is where I leave',
	'I don\'t know shit about music',
	'I say things all the time',
	'I DIDN\'T EVEN KNOW THAT CHEESE WASN\'T ALWAYS PRE-SLICED',
	'Abrams was a gift to the Star Trek',
	'What the fuck is a George?!',
	'Why do you say crisp?  I keep thinking of sandwiches!',
	'Every store is a poor man\'s Hot Topic',
	'My brain is full of brain...sauce',
	'I don\'t even know what a fucking front wheel is',
	'You have to live life to the fullest, and that means snorting salt',
	'\u2018The sky\'s the limit?\u2019  Fuck the sky!  Humans are the limit.',
	'\u201cRed handed\u2019 is from blood?  I thought that it was from people painting barnyards.',
	'Edward Norton is white as a penny',
	'It\'s way too late to be deciding whether \u2018boner\u2019 is an adjective',
	'On a scale from zero to not funny, that\'s not funny times ten',
	'I\'ve eaten tomatoes, but Hitler has never personally wronged me',
	'If you give me strawberries, I will......enjoy them',
	'I had no idea Best Buy existed!',
	'You can pelt me with crackers anytime',
	'I don\'t even know what ricotta is.  It sounds like a vegetable.',
	'I thought you two were glued to the hips',
	'I say the first thing that comes to my...mouth?',
	'The shit I say is great!',
	'The only things I know about silicone are that there\'s a valley full of it and it\'s used in fake boobs',
	'Your earrings look like kidney stones, and they\'re giving me anxiety',
	'You will be at my side, bowing before me',
	'I want a Phallus Chalice',
	'I\'d rather have a live birth on in the background during sex than Eternal Sunshine Of The Spotless Mind',
	'My tongue is a glorious part of my body'
];

/**
 * Recursively step through the document tree and replace text where appropriate.
 */
function walk(node) {
	var child,
		next;
	
	switch (node.nodeType) {
		case TYPES.ELEMENT:
		case TYPES.DOCUMENT:
		case TYPES.DOCUMENT_FRAGMENT:
			child = node.firstChild;
			while (child) {
				next = child.nextSibling;
				walk(child);
				child = next;
			}
			break;
		case TYPES.TEXT_NODE:
			processText(node);
			break;
	}
}

/**
 * Insert quotes into instances of Cipher's name in the given text node.
 * @param {TextNode} textNode - The text node in which to search for Cipher's name
 */
function processText(textNode) {
	var text = textNode.nodeValue,
		randQuote = quotes[Math.floor(Math.random() * quotes.length)];
	
	randQuote = 'Mario \u201c' + randQuote + '\u201d Chuman';
	
	text = text.replace(nameRegEx, randQuote);
	
	textNode.nodeValue = text;
}

// Process the entire document.
walk(document.body);
