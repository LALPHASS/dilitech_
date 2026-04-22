"use client";

import { MessageCircle, Mail, Globe, Send, Share2, Clock, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer id="contact" className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Map */}
          <div>
            <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-4">
              <MapPin className="size-4" />
              Notre Emplacement
            </h3>
            <div className="rounded-lg overflow-hidden border border-border aspect-4/3">
              <iframe
                title="Dilitech — Bamako, Mali"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3906.2!2d-8.0029!3d12.6392!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sBamako%2C+Mali!5e0!3m2!1sfr!2sml!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-4">
              <Phone className="size-4" />
              Contact
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a
                  href="https://wa.me/22371927198"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-foreground transition-colors duration-200 cursor-pointer"
                >
                  <MessageCircle className="size-4 text-[#25D366]" />
                  +223 71 92 71 98
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@dilitech.ml"
                  className="inline-flex items-center gap-2 hover:text-foreground transition-colors duration-200 cursor-pointer"
                >
                  <Mail className="size-4" />
                  contact@dilitech.ml
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">
              Suivez-nous
            </h3>
            <div className="flex gap-3">
              {[
                { icon: Globe, href: "#", label: "Facebook" },
                { icon: Send, href: "#", label: "Instagram" },
                { icon: Share2, href: "#", label: "Twitter" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="size-10 rounded-full flex items-center justify-center
                    bg-muted hover:bg-primary/10 text-muted-foreground hover:text-primary
                    transition-colors duration-200 cursor-pointer"
                >
                  <Icon className="size-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Hours */}
          <div>
            <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-4">
              <Clock className="size-4" />
              Horaires d&apos;ouverture
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex justify-between">
                <span>Lundi – Vendredi</span>
                <span className="text-foreground font-medium">8h – 18h</span>
              </li>
              <li className="flex justify-between">
                <span>Samedi</span>
                <span className="text-foreground font-medium">9h – 14h</span>
              </li>
              <li className="flex justify-between">
                <span>Dimanche</span>
                <span className="text-foreground font-medium">Fermé</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-border text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Dilitech. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
