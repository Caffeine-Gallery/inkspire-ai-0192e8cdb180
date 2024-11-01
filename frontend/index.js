import { backend } from 'declarations/backend';

document.addEventListener('DOMContentLoaded', function() {
    const designInput = document.getElementById('designInput');
    const generateBtn = document.getElementById('generateBtn');
    const newDesignBtn = document.getElementById('newDesignBtn');
    const saveDesignBtn = document.getElementById('saveDesignBtn');
    const designPreview = document.getElementById('designPreview');
    const loadingOverlay = document.getElementById('loadingOverlay');

    async function generateDesign(description) {
        loadingOverlay.classList.remove('hidden');
        try {
            const design = await backend.generateDesign(description);
            displayDesign(design);
        } catch (error) {
            console.error('Error generating design:', error);
            designPreview.innerHTML = '<p class="text-red-500">Error generating design. Please try again.</p>';
        } finally {
            loadingOverlay.classList.add('hidden');
        }
    }

    function displayDesign(design) {
        designPreview.innerHTML = `<img src="${design}" alt="Generated Tattoo Design" class="max-w-full max-h-full object-contain">`;
    }

    generateBtn.addEventListener('click', () => {
        const description = designInput.value.trim();
        if (description) {
            generateDesign(description);
        }
    });

    newDesignBtn.addEventListener('click', () => {
        const description = designInput.value.trim();
        if (description) {
            generateDesign(description);
        }
    });

    saveDesignBtn.addEventListener('click', () => {
        const designImage = designPreview.querySelector('img');
        if (designImage) {
            const link = document.createElement('a');
            link.href = designImage.src;
            link.download = 'tattoo_design.png';
            link.click();
        }
    });

    // Handle color palette selection
    const colorPalettes = document.querySelectorAll('.rounded-full');
    colorPalettes.forEach(palette => {
        palette.addEventListener('click', function() {
            colorPalettes.forEach(p => p.style.transform = 'scale(1)');
            this.style.transform = 'scale(1.2)';
        });
    });

    // Handle style preset selection
    const stylePresets = document.querySelectorAll('.bg-gray-800');
    stylePresets.forEach(preset => {
        preset.addEventListener('click', function() {
            stylePresets.forEach(p => p.classList.remove('ring-2', 'ring-purple-500'));
            this.classList.add('ring-2', 'ring-purple-500');
        });
    });
});
