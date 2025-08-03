package com.cybershield.monitor;

import com.cybershield.monitor.model.User;
import com.cybershield.monitor.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.dao.DataAccessException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.concurrent.TimeUnit;

@Component
public class TestDataLoader implements CommandLineRunner {
    
    private static final Logger logger = LoggerFactory.getLogger(TestDataLoader.class);
    private static final int MAX_RETRIES = 3;
    private static final long RETRY_DELAY_MS = 2000;
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    
    public TestDataLoader(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }
    
    @Override
    public void run(String... args) {
        try {
            initializeAdminUser();
        } catch (Exception e) {
            logger.error("Critical failure during test data initialization", e);
        }
    }
    
    private void initializeAdminUser() {
        int attempt = 0;
        boolean success = false;
        
        while (attempt < MAX_RETRIES && !success) {
            attempt++;
            try {
                if (userRepository.findByUsername("admin").isEmpty()) {
                    User admin = User.createAdminUser(
                        "admin",
                        passwordEncoder.encode("admin123"),
                        List.of("ADMIN")
                    );
                    userRepository.save(admin);
                    logger.info("Admin user created successfully");
                } else {
                    logger.debug("Admin user already exists");
                }
                success = true;
            } catch (DataAccessException e) {
                handleRetry(attempt, e);
            }
        }
        
        if (!success) {
            logger.error("Failed to initialize admin user after {} attempts", MAX_RETRIES);
        }
    }
    
    private void handleRetry(int attempt, DataAccessException e) {
        logger.warn("Attempt {} failed to initialize admin user - {}", attempt, e.getMessage());
        if (attempt < MAX_RETRIES) {
            try {
                TimeUnit.MILLISECONDS.sleep(RETRY_DELAY_MS);
            } catch (InterruptedException ie) {
                Thread.currentThread().interrupt();
                throw new RuntimeException("Initialization interrupted", ie);
            }
        }
    }
}