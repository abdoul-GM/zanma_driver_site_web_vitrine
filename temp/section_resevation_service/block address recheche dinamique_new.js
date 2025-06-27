document.addEventListener('DOMContentLoaded', function () {
    // DOM Elements
    const serviceDropdownButton = document.getElementById('serviceDropdownButton');
    const serviceDropdown = document.getElementById('serviceDropdown');
    const serviceItems = document.querySelectorAll('.service-item');
    const gpsButton = document.getElementById('gpsButton');
    const addressInput = document.getElementById('addressInput');
    const addressSuggestions = document.getElementById('addressSuggestions');
    const submitButton = document.getElementById('submitButton');
    const latitudeInput = document.getElementById('latitude');
    const longitudeInput = document.getElementById('longitude');
    const modalContainer = document.getElementById('modalContainer');
    const modalContent = document.getElementById('modalContent');
    const modalBackdrop = document.getElementById('modalBackdrop');
    const toastContainer = document.getElementById('toastContainer');

    // Variables
    let debounceTimer;
    let selectedService = null;
    let selectedAddress = null;

    // Initialize
    init();

    function init() {
        setupEventListeners();
        createFloatingParticles();
    }

    function setupEventListeners() {
        // Service Dropdown
        serviceDropdownButton.addEventListener('click', handleServiceDropdownClick);
        document.addEventListener('click', handleDocumentClick);
        serviceItems.forEach(item => item.addEventListener('click', handleServiceItemClick));

        // Address Input
        addressInput.addEventListener('input', handleAddressInput);
        addressInput.addEventListener('focus', handleAddressFocus);
        gpsButton.addEventListener('click', handleGpsClick);

        // Submit Button
        submitButton.addEventListener('click', handleSubmit);

        // Modal
        modalBackdrop?.addEventListener('click', hideModal);
        document.addEventListener('keydown', handleKeyDown);
    }

    // Service Dropdown Handlers
    function handleServiceDropdownClick(e) {
        e.stopPropagation();
        serviceDropdown.classList.toggle('hidden');
        if (!serviceDropdown.classList.contains('hidden')) {
            serviceDropdown.classList.add('dropdown-enter');
            setTimeout(() => {
                serviceDropdown.classList.add('dropdown-enter-active');
                serviceDropdown.classList.remove('dropdown-enter');
            }, 10);
        }
    }

    function handleDocumentClick(e) {
        if (!serviceDropdown.contains(e.target) && e.target !== serviceDropdownButton) {
            serviceDropdown.classList.add('hidden');
            serviceDropdown.classList.remove('dropdown-enter-active');
        }
        if (!addressSuggestions.contains(e.target) && e.target !== addressInput) {
            addressSuggestions.classList.add('hidden');
        }
    }

    function handleServiceItemClick(e) {
        e.stopPropagation();
        selectedService = this.getAttribute('data-value');
        const serviceName = this.querySelector('span').textContent;
        serviceDropdownButton.querySelector('span').textContent = serviceName;
        serviceDropdownButton.querySelector('span').classList.remove('text-white/80');
        serviceDropdownButton.querySelector('span').classList.add('text-white', 'font-medium');
        serviceDropdown.classList.add('hidden');
        serviceDropdown.classList.remove('dropdown-enter-active');
        clearFieldError(serviceDropdownButton);
        validateForm();
    }

    // Address Input Handlers
    function handleAddressInput() {
        clearTimeout(debounceTimer);
        const query = this.value.trim();
        selectedAddress = null;
        latitudeInput.value = '';
        longitudeInput.value = '';

        if (query.length < 3) {
            addressSuggestions.classList.add('hidden');
            return;
        }

        debounceTimer = setTimeout(() => {
            fetchAddressSuggestions(query);
        }, 300);
    }

    function handleAddressFocus() {
        const query = this.value.trim();
        if (query.length >= 3) {
            fetchAddressSuggestions(query);
        }
    }

    function handleGpsClick(e) {
        e.stopPropagation();
        if (navigator.geolocation) {
            showLoadingState(gpsButton);
            showToast('info', 'Localisation en cours...', 'Nous recherchons votre position');

            navigator.geolocation.getCurrentPosition(
                position => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;

                    latitudeInput.value = lat;
                    longitudeInput.value = lng;

                    reverseGeocode(lat, lng)
                        .then(address => {
                            addressInput.value = address;
                            selectedAddress = {
                                display_name: address,
                                lat: lat,
                                lon: lng
                            };
                            showSuccessState(gpsButton);
                            showToast('success', 'Position trouvée !', 'Votre adresse a été détectée automatiquement');
                            validateForm();
                        })
                        .catch(() => {
                            addressInput.value = "Position actuelle";
                            selectedAddress = {
                                display_name: "Position actuelle",
                                lat: lat,
                                lon: lng
                            };
                            showErrorState(gpsButton);
                            showToast('warning', 'Adresse incomplète', 'Position trouvée mais adresse non disponible');
                            validateForm();
                        });
                },
                error => {
                    console.error("Erreur de géolocalisation:", error);
                    showErrorState(gpsButton);
                    let errorMessage = "Impossible d'obtenir la localisation";
                    
                    switch(error.code) {
                        case error.PERMISSION_DENIED:
                            errorMessage = "Accès à la localisation refusé";
                            break;
                        case error.POSITION_UNAVAILABLE:
                            errorMessage = "Position non disponible";
                            break;
                        case error.TIMEOUT:
                            errorMessage = "Délai de localisation dépassé";
                            break;
                    }
                    
                    showToast('error', 'Erreur GPS', errorMessage);
                }
            );
        } else {
            showErrorState(gpsButton);
            showToast('error', 'Non supporté', 'La géolocalisation n\'est pas supportée par votre navigateur');
        }
    }

    // Submit Handler
    function handleSubmit(e) {
        e.preventDefault();
        
        if (!validateForm()) {
            showToast('warning', 'Formulaire incomplet', 'Veuillez remplir tous les champs requis');
            return;
        }

        showLoadingState(submitButton);
        
        // Simuler une soumission
        setTimeout(() => {
            const formData = {
                service: selectedService,
                address: selectedAddress?.display_name || addressInput.value,
                latitude: latitudeInput.value,
                longitude: longitudeInput.value,
                timestamp: new Date().toISOString()
            };

            console.log('Données du formulaire:', formData);
            
            showSuccessState(submitButton);
            showModal(
                'success',
                'Demande envoyée !',
                `Votre demande de ${getServiceDisplayName(selectedService)} a été enregistrée. Vous recevrez une confirmation par email.`,
                [
                    {
                        text: 'Nouvelle demande',
                        class: 'submit-button',
                        action: () => {
                            resetForm();
                            hideModal();
                        }
                    },
                    {
                        text: 'Fermer',
                        class: 'bg-gray-300 hover:bg-gray-400 text-gray-800',
                        action: hideModal
                    }
                ]
            );
        }, 2000);
    }

    // Address API Functions
    async function fetchAddressSuggestions(query) {
        try {
            // Utilisation de l'API Nominatim d'OpenStreetMap (gratuite)
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=5&q=${encodeURIComponent(query)}&countrycodes=bf`
            );
            
            if (!response.ok) throw new Error('Erreur réseau');
            
            const data = await response.json();
            displayAddressSuggestions(data);
        } catch (error) {
            console.error('Erreur lors de la recherche d\'adresses:', error);
            // Fallback avec des suggestions statiques pour Ouagadougou
            const fallbackSuggestions = [
                {
                    display_name: `${query}, Ouagadougou, Burkina Faso`,
                    lat: "12.3714",
                    lon: "-1.5197"
                }
            ];
            displayAddressSuggestions(fallbackSuggestions);
        }
    }

    async function reverseGeocode(lat, lng) {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
            );
            
            if (!response.ok) throw new Error('Erreur réseau');
            
            const data = await response.json();
            return data.display_name || `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
        } catch (error) {
            console.error('Erreur de géocodage inverse:', error);
            throw error;
        }
    }

    function displayAddressSuggestions(suggestions) {
        addressSuggestions.innerHTML = '';
        
        if (suggestions.length === 0) {
            addressSuggestions.innerHTML = '<div class="p-4 text-gray-500 text-center">Aucune adresse trouvée</div>';
            addressSuggestions.classList.remove('hidden');
            return;
        }

        suggestions.forEach(suggestion => {
            const div = document.createElement('div');
            div.className = 'p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors duration-200';
            div.innerHTML = `
                <div class="font-medium text-gray-800">${truncateAddress(suggestion.display_name)}</div>
                ${suggestion.address ? `<div class="text-sm text-gray-600">${formatAddressDetails(suggestion.address)}</div>` : ''}
            `;
            
            div.addEventListener('click', () => {
                addressInput.value = suggestion.display_name;
                latitudeInput.value = suggestion.lat;
                longitudeInput.value = suggestion.lon;
                selectedAddress = suggestion;
                addressSuggestions.classList.add('hidden');
                clearFieldError(addressInput);
                validateForm();
            });
            
            addressSuggestions.appendChild(div);
        });
        
        addressSuggestions.classList.remove('hidden');
    }

    // Utility Functions
    function truncateAddress(address, maxLength = 60) {
        return address.length > maxLength ? address.substring(0, maxLength) + '...' : address;
    }

    function formatAddressDetails(address) {
        const parts = [];
        if (address.road) parts.push(address.road);
        if (address.suburb) parts.push(address.suburb);
        if (address.city || address.town || address.village) {
            parts.push(address.city || address.town || address.village);
        }
        return parts.join(', ');
    }

    function getServiceDisplayName(serviceValue) {
        const serviceNames = {
            'taxi': 'Taxi',
            'commande-repas': 'Commande de repas',
            'livraison-colis': 'Livraison de colis',
            'achats-livraison': 'Achats et livraison',
            'achats-pharmacie': 'Pharmacie'
        };
        return serviceNames[serviceValue] || serviceValue;
    }

    // Validation Functions
    function validateForm() {
        let isValid = true;
        
        // Validation du service
        if (!selectedService) {
            setFieldError(serviceDropdownButton, 'Veuillez sélectionner un service');
            isValid = false;
        } else {
            clearFieldError(serviceDropdownButton);
        }
        
        // Validation de l'adresse
        if (!addressInput.value.trim()) {
            setFieldError(addressInput, 'Veuillez saisir une adresse');
            isValid = false;
        } else {
            clearFieldError(addressInput);
        }
        
        // Mise à jour de l'état du bouton
        submitButton.disabled = !isValid;
        if (isValid) {
            submitButton.classList.remove('opacity-60', 'cursor-not-allowed');
        } else {
            submitButton.classList.add('opacity-60', 'cursor-not-allowed');
        }
        
        return isValid;
    }

    function setFieldError(field, message) {
        field.classList.add('input-error');
        
        // Supprimer le message d'erreur existant
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Ajouter le nouveau message d'erreur
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
    }

    function clearFieldError(field) {
        field.classList.remove('input-error');
        const errorMessage = field.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }

    // UI State Functions
    function showLoadingState(button) {
        const originalContent = button.innerHTML;
        button.disabled = true;
        button.setAttribute('data-original-content', originalContent);
        button.innerHTML = '<i class="fa-solid fa-spinner loading-spinner"></i>';
    }

    function showSuccessState(button) {
        const originalContent = button.getAttribute('data-original-content');
        button.disabled = false;
        button.innerHTML = '<i class="fa-solid fa-check text-green-600"></i>';
        
        setTimeout(() => {
            button.innerHTML = originalContent;
        }, 2000);
    }

    function showErrorState(button) {
        const originalContent = button.getAttribute('data-original-content');
        button.disabled = false;
        button.innerHTML = '<i class="fa-solid fa-exclamation-triangle text-red-600"></i>';
        
        setTimeout(() => {
            button.innerHTML = originalContent;
        }, 2000);
    }

    // Modal Functions
    function showModal(type, title, message, buttons = []) {
        const iconMap = {
            success: '<i class="fa-solid fa-check-circle text-green-500 text-4xl mb-4"></i>',
            error: '<i class="fa-solid fa-exclamation-circle text-red-500 text-4xl mb-4"></i>',
            warning: '<i class="fa-solid fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>',
            info: '<i class="fa-solid fa-info-circle text-blue-500 text-4xl mb-4"></i>'
        };

        const defaultButtons = [
            {
                text: 'OK',
                class: 'submit-button',
                action: hideModal
            }
        ];

        const modalButtons = buttons.length > 0 ? buttons : defaultButtons;

        modalContent.innerHTML = `
            <div class="text-center">
                ${iconMap[type] || iconMap.info}
                <h3 class="text-xl font-semibold text-gray-800 mb-2">${title}</h3>
                <p class="text-gray-600 mb-6">${message}</p>
                <div class="flex gap-3 justify-center">
                    ${modalButtons.map(btn => `
                        <button class="px-6 py-2 rounded-lg font-medium transition-all duration-300 ${btn.class}" data-action="${modalButtons.indexOf(btn)}">
                            ${btn.text}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;

        // Ajouter les event listeners pour les boutons
        modalButtons.forEach((btn, index) => {
            const buttonElement = modalContent.querySelector(`[data-action="${index}"]`);
            if (buttonElement && btn.action) {
                buttonElement.addEventListener('click', btn.action);
            }
        });

        modalContainer.classList.remove('hidden');
        modalContainer.classList.add('modal-enter');
        setTimeout(() => {
            modalContainer.classList.add('modal-enter-active');
            modalContainer.classList.remove('modal-enter');
        }, 10);
    }

    function hideModal() {
        modalContainer.classList.add('modal-leave');
        modalContainer.classList.remove('modal-enter-active');
        setTimeout(() => {
            modalContainer.classList.add('hidden');
            modalContainer.classList.remove('modal-leave');
        }, 200);
    }

    // Toast Functions
    function showToast(type, title, message, duration = 5000) {
        const toastId = Date.now();
        const toast = document.createElement('div');
        toast.className = `toast toast-${type} p-4 rounded-lg shadow-lg text-white mb-2`;
        toast.id = `toast-${toastId}`;
        
        toast.innerHTML = `
            <div class="flex items-start">
                <div class="flex-1">
                    <div class="font-semibold">${title}</div>
                    <div class="text-sm opacity-90">${message}</div>
                </div>
                <button class="ml-4 text-white/80 hover:text-white" onclick="hideToast(${toastId})">
                    <i class="fa-solid fa-times"></i>
                </button>
            </div>
        `;

        toastContainer.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);

        setTimeout(() => {
            hideToast(toastId);
        }, duration);
    }

    function hideToast(toastId) {
        const toast = document.getElementById(`toast-${toastId}`);
        if (toast) {
            toast.classList.add('hide');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }
    }

    // Make hideToast globally available
    window.hideToast = hideToast;

    // Form Reset Function
    function resetForm() {
        selectedService = null;
        selectedAddress = null;
        serviceDropdownButton.querySelector('span').textContent = 'Sélectionnez un service';
        serviceDropdownButton.querySelector('span').classList.add('text-white/80');
        serviceDropdownButton.querySelector('span').classList.remove('text-white', 'font-medium');
        addressInput.value = '';
        latitudeInput.value = '';
        longitudeInput.value = '';
        clearFieldError(serviceDropdownButton);
        clearFieldError(addressInput);
        validateForm();
    }

    // Floating Particles
    function createFloatingParticles() {
        const particlesContainer = document.getElementById('particles-container');
        if (!particlesContainer) return;

        // Créer des particules supplémentaires dynamiquement
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.width = Math.random() * 4 + 2 + 'px';
            particle.style.height = particle.style.width;
            particle.style.animationDelay = Math.random() * 20 + 's';
            particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
            particlesContainer.appendChild(particle);
        }
    }

    // Keyboard Events
    function handleKeyDown(e) {
        if (e.key === 'Escape') {
            if (!modalContainer.classList.contains('hidden')) {
                hideModal();
            }
            if (!serviceDropdown.classList.contains('hidden')) {
                serviceDropdown.classList.add('hidden');
            }
            if (!addressSuggestions.classList.contains('hidden')) {
                addressSuggestions.classList.add('hidden');
            }
        }
    }

    // Initialize form validation on load
    validateForm();
});