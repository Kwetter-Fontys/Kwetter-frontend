/**
 * Here you can add the configuration related to keycloak
 * So we can use this common config for diffrent environment
 */
import { KeycloakConfig } from 'keycloak-js';

const keycloakConfig: KeycloakConfig = {
  url: 'https://keycloak.sebananasprod.nl/auth',
  realm: 'Kwetter',
  clientId: 'Kwetter-frontend',
};

export default keycloakConfig;
