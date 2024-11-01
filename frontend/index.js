import { backend } from 'declarations/backend';

document.addEventListener('DOMContentLoaded', function() {
    const designInput = document.getElementById('designInput');
    const generateBtn = document.getElementById('generateBtn');
    const newDesignBtn = document.getElementById('newDesignBtn');
    const saveDesignBtn = document.getElementById('saveDesignBtn');
    const designPreview = document.getElementById('designPreview');
    const loadingOverlay = document.getElementById('loadingOverlay');
    const styleIntensitySlider = document.getElementById('styleIntensity');
    const detailLevelSlider = document.getElementById('detailLevel');
    const colorPalettes = document.querySelectorAll('.color-palette');
    const stylePresets = document.querySelectorAll('.style-preset');

    let currentParams = {
        description: '',
        styleIntensity: 75,
        detailLevel: 85,
        colorPalette: 'purple',
        stylePreset: 'traditional'
    };

    async function generateDesign() {
        loadingOverlay.classList.remove('hidden');
        try {
            const design = await backend.generateDesign(currentParams);
            displayDesign(design);
        } catch (error) {
            console.error('Error generating design:', error);
            designPreview.innerHTML = '<p class="text-red-500">Error generating design. Please try again.</p>';
        } finally {
            loadingOverlay.classList.add('hidden');
        }
    }

    function displayDesign(designUrl) {
        designPreview.innerHTML = `<img src="${designUrl}" alt="Generated Tattoo Design" class="max-w-full max-h-full object-contain">`;
    }

    generateBtn.addEventListener('click', () => {
        currentParams.description = designInput.value.trim();
        if (currentParams.description) {
            generateDesign();
        }
    });

    newDesignBtn.addEventListener('click', generateDesign);

    saveDesignBtn.addEventListener('click', () => {
        const designImage = designPreview.querySelector('img');
        if (designImage) {
            const link = document.createElement('a');
            link.href = designImage.src;
            link.download = 'tattoo_design.png';
            link.click();
        }
    });

    styleIntensitySlider.addEventListener('input', (e) => {
        currentParams.styleIntensity = parseInt(e.target.value);
        document.getElementById('styleIntensityValue').textContent = `${currentParams.styleIntensity}%`;
    });

    detailLevelSlider.addEventListener('input', (e) => {
        currentParams.detailLevel = parseInt(e.target.value);
        document.getElementById('detailLevelValue').textContent = `${currentParams.detailLevel}%`;
    });

    colorPalettes.forEach(palette => {
        palette.addEventListener('click', function() {
            colorPalettes.forEach(p => p.classList.remove('ring-2', 'ring-purple-500'));
            this.classList.add('ring-2', 'ring-purple-500');
            currentParams.colorPalette = this.dataset.color;
        });
    });

    stylePresets.forEach(preset => {
        preset.addEventListener('click', function() {
            stylePresets.forEach(p => p.classList.remove('ring-2', 'ring-purple-500'));
            this.classList.add('ring-2', 'ring-purple-500');
            currentParams.stylePreset = this.dataset.style;
        });
    });
});
