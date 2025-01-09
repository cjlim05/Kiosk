package org.example.kioback.service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class PayService {
    public String confirmPayment(String paymentKey, String orderId, int amount) throws Exception {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://api.tosspayments.com/v1/payments/confirm"))
                .header("Authorization", "Basic dGVzdF9za19aMWFPd1g3SzhtQjBYTzFuQVIxVzN5UXh6dk5QOg==")
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(String.format(
                        "{\"paymentKey\":\"%s\",\"orderId\":\"%s\",\"amount\":%d}", paymentKey, orderId, amount)))
                .build();

        HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
        return response.body();
    }
}
