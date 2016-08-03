/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* bender-tags: ui, toolbar */

import mix from '/ckeditor5/utils/mix.js';
import Editor from '/ckeditor5/core/editor/editor.js';
import Controller from '/ckeditor5/ui/controller.js';
import ToolbarBindingsMixin from '/ckeditor5/ui/bindings/toolbarbindingsmixin.js';

describe( 'ToolbarBindingsMixin', () => {
	let mixinInstance, editor;

	beforeEach( () => {
		editor = new Editor();

		class MixClass extends Controller {
			constructor( model, view ) {
				super( model, view );

				this.addCollection( 'buttons' );
			}
		}

		mix( MixClass, ToolbarBindingsMixin );

		mixinInstance = new MixClass();
		mixinInstance.editor = editor;
	} );

	describe( 'addButtons', () => {
		it( 'creates buttons for each button name', () => {
			const createSpy = sinon.spy( () => new Controller() );

			editor.ui = {
				featureComponents: {
					create: createSpy
				}
			};

			mixinInstance.addButtons( [ 'foo', 'bar' ] );

			expect( createSpy.callCount ).to.equal( 2 );
			expect( createSpy.firstCall.calledWith( 'foo' ) ).to.be.true;
			expect( createSpy.secondCall.calledWith( 'bar' ) ).to.be.true;
		} );

		it( 'adds created components to the collection of buttons', () => {
			const component = new Controller();
			const createSpy = sinon.spy( () => component );

			editor.ui = {
				featureComponents: {
					create: createSpy
				}
			};

			mixinInstance.addButtons( [ 'foo' ] );

			expect( mixinInstance.collections.get( 'buttons' ).get( 0 ) ).to.equal( component );
		} );
	} );
} );
