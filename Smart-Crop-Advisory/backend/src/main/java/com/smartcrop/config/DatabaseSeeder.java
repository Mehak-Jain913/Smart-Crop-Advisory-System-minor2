package com.smartcrop.config;

import com.smartcrop.entity.Scheme;
import com.smartcrop.repository.SchemeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Component
public class DatabaseSeeder implements CommandLineRunner {

    @Autowired
    private SchemeRepository schemeRepository;

    @Override
    public void run(String... args) throws Exception {
        if (schemeRepository.count() == 0) {
            System.out.println("🌱 [DATABASE SEEDER] Schemes database is empty! Seeding default Indian Agricultural Schemes...");
            
            List<Scheme> defaultSchemes = new ArrayList<>();

            defaultSchemes.add(Scheme.builder()
                    .title("Pradhan Mantri Fasal Bima Yojana (PMFBY)")
                    .url("https://pmfby.gov.in")
                    .source("govt-website")
                    .card("Comprehensive yield-based crop insurance coverage against damage due to non-preventable natural risks like drought, flood, pests, and storms. Premium rates are kept extremely low: 2% for Kharif crops, 1.5% for Rabi crops, and 5% for annual commercial/horticultural crops.")
                    .scrapedAt(LocalDateTime.now())
                    .build());

            defaultSchemes.add(Scheme.builder()
                    .title("PM Kisan Samman Nidhi (PM-KISAN)")
                    .url("https://pmkisan.gov.in")
                    .source("govt-website")
                    .card("Direct income support scheme providing ₹6,000 per year in three equal four-monthly installments of ₹2,000 directly to the bank accounts of land-holding farmer families across the country, easing financial liquidity and procurement of quality seeds/fertilizers.")
                    .scrapedAt(LocalDateTime.now())
                    .build());

            defaultSchemes.add(Scheme.builder()
                    .title("National Food Security Mission (NFSM)")
                    .url("https://www.nfsm.gov.in")
                    .source("govt-website")
                    .card("Centrally sponsored scheme launched to restore soil fertility and promote sustainable increases in the production of high-yield rice, wheat, pulses, coarse cereals, and commercial cash crops through technical training, seed distribution, and farm mechanization.")
                    .scrapedAt(LocalDateTime.now())
                    .build());

            defaultSchemes.add(Scheme.builder()
                    .title("Soil Health Card Scheme")
                    .url("https://www.soilhealth.dac.gov.in")
                    .source("govt-website")
                    .card("A scheme providing farmers with customized printout Soil Health Cards indicating individual field soil chemistry. It prescribes optimal chemical fertilizer dosages and organic amendments required for 12 key parameters (NPK, sulfur, micronutrients) to maximize yield.")
                    .scrapedAt(LocalDateTime.now())
                    .build());

            defaultSchemes.add(Scheme.builder()
                    .title("Pradhan Mantri Krishi Sinchayee Yojana (PMKSY)")
                    .url("https://pmksy.gov.in")
                    .source("govt-website")
                    .card("Launched with the motto 'Har Khet Ko Pani' (Water for every field) and 'More Crop Per Drop' to focus on creating structural water sources, expanding cultivation under micro-irrigation, and reducing water wastage in fields via drip and sprinkler systems.")
                    .scrapedAt(LocalDateTime.now())
                    .build());

            schemeRepository.saveAll(defaultSchemes);
            System.out.println("✅ [DATABASE SEEDER] Successfully seeded " + defaultSchemes.size() + " government schemes in MySQL.");
        } else {
            System.out.println("ℹ️ [DATABASE SEEDER] Schemes database already populated. Skipping seeding.");
        }
    }
}
