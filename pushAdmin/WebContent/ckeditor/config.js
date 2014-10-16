/**
 * @license Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';
	config.removePlugins = 'find,flash,a11yhelp,print,save,smiley,PageBreak';
};



CKEDITOR.on( 'dialogDefinition', function( ev ) {

	    // Take the dialog name and its definition from the event data.

var dialogName = ev.data.name;

var dialogDefinition = ev.data.definition;



// Check if the definition is from the dialog window you are interested in (the "Link" dialog window).

if ( dialogName == 'link' ) {

    // Get a reference to the "Link Info" tab.

    var targetTab = dialogDefinition.getContents('target');



    // Set the default value for the URL field.

    var typeField = targetTab.get( 'linkTargetType' );

    typeField[ 'default' ] = 'popup';



   

} 



});