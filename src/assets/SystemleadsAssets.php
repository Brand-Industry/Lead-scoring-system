<?php

namespace tbi\systemleads\assets;

use craft\web\AssetBundle;
use craft\web\assets\cp\CpAsset;

class SystemleadsAssets extends AssetBundle
{
    public function init(): void
    {
        $this->sourcePath = '@system-leads/resources';

        $this->depends = [
            CpAsset::class,
        ];

        /*$this->css = [*/
        /*'css/app.css',*/
        /*];*/

        $this->js = [
            'dist/js/systemleads.js',
        ];

        parent::init();
    }
}
