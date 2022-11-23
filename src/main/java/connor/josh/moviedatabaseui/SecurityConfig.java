package connor.josh.moviedatabaseui;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        //loop through
        auth.inMemoryAuthentication().withUser("connor")
                .password(passwordEncoder().encode("password"))
                .authorities("USER");
    }

    //stops the browser prompting for username/password, also see in configure()
    public class noPopupBasicAuthenticationEntryPoint implements AuthenticationEntryPoint {
        @Override
        public void commence(HttpServletRequest request, HttpServletResponse response,
                             AuthenticationException authException) throws IOException, ServletException {

            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, authException.getMessage());
        };

    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().and()
                .authorizeRequests()
                .antMatchers("/index.html").permitAll()
                .antMatchers("/favorites.html").permitAll()
                .antMatchers("/login.html").permitAll()
                .antMatchers("/movie.html").permitAll()
                .antMatchers("/sign_up.html").permitAll()
                .antMatchers("/javascript/login.js").permitAll()
                .antMatchers("/javascript/index.js").permitAll()

                .antMatchers("/user/**").hasAuthority("USER") // allows your homepage to be accessed
                .antMatchers("/movies/**").hasAuthority("USER") // allows your homepage to be accessed

                .anyRequest().authenticated() //any other requests, use httpBasic authentication
                .and().csrf().disable() //disable cross site request forgery
                .sessionManagement().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .httpBasic()
                .authenticationEntryPoint(new noPopupBasicAuthenticationEntryPoint());
                //this stops browser from prompting for username/password

    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
