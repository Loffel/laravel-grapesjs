<?php

namespace Loffel\Grapesjs\App\Editor;


class StorageManager
{
    public string $id = 'laravel-grapesjs-';
    public string $type = 'remote';

    public bool $autosave = true;
    public int $stepsBeforeSave = 10;
    public bool $autoload = false;
    public array $options = [];
    public array $headers = [];

    function __construct($save_url = null)
    {
        $this->autosave = config('laravel-grapesjs.storage_manager.autosave', true);
        $this->stepsBeforeSave = config('laravel-grapesjs.storage_manager.steps_before_save', 10);

        if(!empty($save_url)){
            $this->type = 'remote';
            $this->options = [
                'remote' => [
                    'urlStore' => $save_url,
                    'headers' => [
                        'X-CSRF-TOKEN' => csrf_token()
                    ]
                ]
            ];
        }
    }
}
