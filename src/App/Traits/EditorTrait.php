<?php

namespace Loffel\Grapesjs\App\Traits;

use Loffel\Grapesjs\App\Editor\Config;
use Illuminate\Http\Request;

trait EditorTrait{

	protected function show_gjs_editor(Request $request, $model){
		$editorConfig = app(Config::class)->initialize($model);

		return view('laravel-grapesjs::edittor', compact('editorConfig', 'model'));
	}

	protected function store_gjs_data(Request $request, $model)
	{
		$model->gjs_data = $request->all();

	    $model->save();

	    return response()->noContent(200);
	}
}
