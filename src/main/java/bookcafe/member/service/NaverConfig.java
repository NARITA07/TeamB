package bookcafe.member.service;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.client.DefaultOAuth2ClientContext;
import org.springframework.security.oauth2.client.OAuth2RestTemplate;
import org.springframework.security.oauth2.client.token.grant.code.AuthorizationCodeResourceDetails;

@Configuration
public class NaverConfig {

    @Bean
    public AuthorizationCodeResourceDetails naver() {
        AuthorizationCodeResourceDetails details = new AuthorizationCodeResourceDetails();
        details.setClientId("KFlxuf0Rhy_fUBNEU_1e");
        details.setClientSecret("3eFou5WWJ5");
        details.setAccessTokenUri("https://nid.naver.com/oauth2.0/token");
        details.setUserAuthorizationUri("https://nid.naver.com/oauth2.0/authorize");
//        details.setRedirectUri("http://localhost:8082/callback.do");
        details.setScope(Arrays.asList("profile", "email"));
        return details;
    }

    @Bean
    public OAuth2RestTemplate naverRestTemplate() {
        return new OAuth2RestTemplate(naver(), new DefaultOAuth2ClientContext());
    }
}
