import {KeycloakOptions, KeycloakService} from "keycloak-angular";
import keycloakConfig from "../../environments/keycloak.config";


export function initializer(keycloak: KeycloakService): () => Promise<boolean> {
  const options: KeycloakOptions = {
    config: keycloakConfig,
    loadUserProfileAtStartUp: true,
    initOptions: {
      onLoad: 'check-sso',
      // onLoad: 'login-required'
      checkLoginIframe: false
    },
    bearerExcludedUrls: ["https://keycloak.sebananasprod.nl/auth/admin/realms/kwetter/users"]
  };

  return () => keycloak.init(options)
}
