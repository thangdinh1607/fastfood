package com.example.be.model;

public class PayPalLink {
    private String link;

    public PayPalLink(String link) {
        this.link = link;
    }

    public PayPalLink() {
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }
}
