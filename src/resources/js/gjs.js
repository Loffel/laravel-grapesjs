import grapesjs from 'grapesjs';
import pluginBlocks from 'grapesjs-blocks-basic';
import 'grapesjs-blocks-bootstrap4';
import CodeEditor from "./plugins/code-editor"
import ExtraButtons from "./plugins/extra-buttons"
// import ImageEditor from "./plugins/image-editor"
import CustomFontFamily from "./plugins/custom-font-family"
import Loader from "./plugins/loader"
import Notifications from "./plugins/notifications"
import SaveButton from "./plugins/save-button"
import BackButton from "./plugins/back-button"
import Templates from "./plugins/templates"
import CustomTypes from "./plugins/custom-types"
import DeviceButtons from './plugins/device-buttons'
import BackgroundImage from "./plugins/background-image"
import PluginsLoader from "./plugins/plugins-loader"
import StyleEditor from "./plugins/style-editor"
import LinkableImage from "./plugins/linkable-image"
import axios from 'axios';

import grapesjsTouch from 'grapesjs-touch';
import ImageEditor from 'grapesjs-tui-image-editor';

let config = window.editorConfig;
delete window.editorConfig;

let plugins = []
let pluginsOpts = {}

if(config.pluginManager.basicBlocks){
	plugins.push(pluginBlocks)
	pluginsOpts['gjs-blocks-basic'] = config.pluginManager.basicBlocks;
}

if(config.pluginManager.bootstrap4Blocks){
	plugins.push('grapesjs-blocks-bootstrap4')
	pluginsOpts['grapesjs-blocks-bootstrap4'] = config.pluginManager.bootstrap4Blocks;
}

if(config.pluginManager.codeEditor){	
	plugins.push(CodeEditor)
	pluginsOpts[CodeEditor] = config.pluginManager.codeEditor
}

if(config.pluginManager.imageEditor){	
	plugins.push(ImageEditor)
	pluginsOpts[ImageEditor] = config.pluginManager.imageEditor
}

if(config.pluginManager.templates){	
	plugins.push(Templates)
	pluginsOpts[Templates] = config.pluginManager.templates
}

plugins = [
	...plugins,
	CustomFontFamily,
	BackgroundImage,
	Loader,
	Notifications,
	// CustomTypes,
	ExtraButtons,
	SaveButton,
	BackButton,
	DeviceButtons,
	PluginsLoader,
	StyleEditor,
	LinkableImage,
	grapesjsTouch,
]

pluginsOpts = {
	...pluginsOpts,
	[BackgroundImage]: {},
	[CustomFontFamily]: {fonts: config.pluginManager.customFonts},
	[Loader]: {},
	[Notifications]: {},
	// [CustomTypes]: {},
	[ExtraButtons]: {},
	[SaveButton]: {},
	[BackButton]: {},
	[DeviceButtons]: {},
	[PluginsLoader]: config.pluginManager.pluginsLoader,
	[StyleEditor]: {},
	[LinkableImage]: {},
	[grapesjsTouch]: {},
};

config.plugins = plugins
config.pluginsOpts = pluginsOpts

config.styleManager = {}

config.storageManager.options.remote.onStore = (storeData, gEditor) => {
	const projectData = gEditor.getProjectData()
	const editorComponents = JSON.stringify(projectData.pages[0].frames[0].component)

	return {
		'assets': JSON.stringify(projectData.assets),
		'css': gEditor.getCss(),
		'html': gEditor.getHtml(),
		'components': editorComponents,
		'styles': projectData.styles
	}
}

config.showOffsets = true;

console.log(config)

window.grapeeditor = grapesjs.init(config);

window.grapeeditor.on('asset:remove', (asset) => {
	axios.delete(config.assetManager.deleteUrl, {
		data: {
			fileId: asset.id
		}
	});
})

if(config.exposeApi){
	Object.defineProperty(window, 'gjsEditor', {
		value: editor
	})
}
