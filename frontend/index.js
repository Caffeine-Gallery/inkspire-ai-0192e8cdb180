import { backend } from 'declarations/backend';

document.addEventListener('DOMContentLoaded', function() {
    const designInput = document.getElementById('designInput');
    const generateBtn = document.getElementById('generateBtn');
    const newDesignBtn = document.getElementById('newDesignBtn');
    const saveDesignBtn = document.getElementById('saveDesignBtn');
    const designPreview = document.getElementById('designPreview');
    const loadingOverlay = document.getElementById('loadingOverlay');
    const lineThicknessSlider = document.getElementById('lineThickness');
    const contrastSlider = document.getElementById('contrast');
    const brightnessSlider = document.getElementById('brightness');
    const colorPalettes = document.querySelectorAll('.color-palette');
    const stylePresets = document.querySelectorAll('.style-preset');

    let currentParams = {
        description: '',
        lineThickness: 50,
        contrast: 75,
        brightness: 50,
        colorPalette: 'purple',
        stylePreset: 'traditional'
    };

    let currentDesignUrl = '';

    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    async function generateDesign() {
        loadingOverlay.classList.remove('hidden');
        try {
            const design = await backend.generateDesign(currentParams);
            currentDesignUrl = design;
            displayDesign(design);
        } catch (error) {
            console.error('Error generating design:', error);
            designPreview.innerHTML = '<p class="text-red-500">Error generating design. Please try again.</p>';
        } finally {
            loadingOverlay.classList.add('hidden');
        }
    }

    function displayDesign(designUrl) {
        const img = designPreview.querySelector('img');
        if (img) {
            img.src = designUrl;
        } else {
            designPreview.innerHTML = `<img src="${designUrl}" alt="Generated Tattoo Design" class="max-w-full max-h-full object-contain">`;
        }
    }

    function updateDesignUrl() {
        if (!currentDesignUrl) return;

        const url = new URL(currentDesignUrl);
        url.searchParams.set('line', currentParams.lineThickness / 100);
        url.searchParams.set('contrast', currentParams.contrast / 100);
        url.searchParams.set('brightness', currentParams.brightness / 100);
        url.searchParams.set('color', currentParams.colorPalette);
        url.searchParams.set('style', currentParams.stylePreset);

        displayDesign(url.toString());
    }

    const debouncedUpdateDesign = debounce(updateDesignUrl, 300);

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

    lineThicknessSlider.addEventListener('input', (e) => {
        currentParams.lineThickness = parseInt(e.target.value);
        document.getElementById('lineThicknessValue').textContent = `${currentParams.lineThickness}%`;
        debouncedUpdateDesign();
    });

    contrastSlider.addEventListener('input', (e) => {
        currentParams.contrast = parseInt(e.target.value);
        document.getElementById('contrastValue').textContent = `${currentParams.contrast}%`;
        debouncedUpdateDesign();
    });

    brightnessSlider.addEventListener('input', (e) => {
        currentParams.brightness = parseInt(e.target.value);
        document.getElementById('brightnessValue').textContent = `${currentParams.brightness}%`;
        debouncedUpdateDesign();
    });

    colorPalettes.forEach(palette => {
        palette.addEventListener('click', function() {
            colorPalettes.forEach(p => p.classList.remove('ring-2', 'ring-purple-500'));
            this.classList.add('ring-2', 'ring-purple-500');
            currentParams.colorPalette = this.dataset.color;
            debouncedUpdateDesign();
        });
    });

    stylePresets.forEach(preset => {
        preset.addEventListener('click', function() {
            stylePresets.forEach(p => p.classList.remove('ring-2', 'ring-purple-500'));
            this.classList.add('ring-2', 'ring-purple-500');
            currentParams.stylePreset = this.dataset.style;
            debouncedUpdateDesign();
        });
    });
});
