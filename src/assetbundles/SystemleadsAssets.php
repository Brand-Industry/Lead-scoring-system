<?php

namespace brandindustry\leadscoringsystem\assetbundles;


use craft\web\AssetBundle;
use craft\web\assets\cp\CpAsset;

class SystemleadsAssets extends AssetBundle
{
    public function init(): void
    {
        $this->sourcePath = '@brandindustry/leadscoringsystem/web';
        // $this->sourcePath = "@verbb/leadscoringsystem/resources/dist";

        $this->depends = [
            CpAsset::class,
        ];

        $this->css = [
            'css/app.css',
        ];

        $this->js = [
            'js/systemleads.js',
        ];

        parent::init();
    }
}
