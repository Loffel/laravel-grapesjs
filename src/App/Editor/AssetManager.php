<?php

namespace Loffel\Grapesjs\App\Editor;

use Loffel\Grapesjs\App\Repositories\AssetRepository;

class AssetManager
{
    public array $assets = [];
    public ?string $upload = null;
    public ?string $uploadName = null;
    public array $headers = [];
    public int $autoAdd = 1;
    public string $uploadText = 'Drop files here or click to upload';
    public string $addBtnText = 'Add image';
    public int $dropzone = 1;
    public int $openAssetsOnDrop = 0;
    public string $modalTitle = 'Upload Images';
    public bool $showUrlInput = false;
    public ?string $deleteUrl;

    function __construct(AssetRepository $assetRepository)
    {
        $this->headers['X-CSRF-TOKEN'] = csrf_token();
        $this->upload = $assetRepository->getUploadUrl();
        $this->uploadName = 'file';

        $this->assets = $assetRepository->getAllMediaLinks();
        $this->deleteUrl = route('laravel-grapesjs.asset.delete');
    }
}
