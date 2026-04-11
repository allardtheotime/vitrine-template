# CLIENT.md — Brief client
# À remplir AVANT de lancer Claude Code sur un nouveau projet.
# Claude Code lit ce fichier pour comprendre ce qui est attendu.
# Temps de remplissage estimé : 5 minutes à partir des réponses du formulaire Tally.

---

## Informations entreprise

```
Nom du client          :
Secteur                :
Ville                  :
Téléphone              :
Email professionnel    :
Adresse complète       :
Horaires               :
SIRET                  :
Slogan (si disponible) :
```

---

## Design

```
Couleur principale (hex) :
Couleur secondaire (hex) :
Style visuel             : [ ] Moderne  [ ] Chaleureux  [ ] Sérieux/Pro  [ ] Artisanal
Police                   : [ ] Inter (défaut)  [ ] Autre :
```

---

## Mode du site

```
[ ] One-page  (sections sur une seule page, navigation par ancres)
[ ] Multi-pages (chaque section = une page séparée)
```

---

## Sections à inclure

Cocher les sections à afficher. L'ordre ici est l'ordre d'affichage sur le site.

```
[ ] Hero          — titre accrocheur + CTA
[ ] Services      — liste des prestations
[ ] About         — présentation de l'entreprise
[ ] Testimonials  — avis clients
[ ] CTABanner     — bandeau d'appel à l'action
[ ] Contact       — formulaire + coordonnées
```

Sections supplémentaires demandées (hors boilerplate) :
```
(lister ici si besoin, ex: galerie photos, menu restaurant, grille équipe...)
```

---

## Contenu disponible

```
Textes rédigés par le client  : [ ] Oui  [ ] Non → à générer avec Claude
Photos fournies par le client : [ ] Oui  [ ] Non → à chercher sur Unsplash/Pexels
Logo fourni                   : [ ] Oui  [ ] Non → texte seul en attendant
Avis clients disponibles      : [ ] Oui (nombre : )  [ ] Non → à simuler ou masquer la section
```

---

## Contenu Hero

```
Titre principal  :
Sous-titre       :
Texte du bouton  :
Lien du bouton   : [ ] #contact  [ ] Autre :
Image de fond    : [ ] Photo client  [ ] Unsplash  [ ] Couleur unie
```

---

## Services (remplir autant de lignes que nécessaire)

```
Service 1 — Icône :   Titre :   Description courte :
Service 2 — Icône :   Titre :   Description courte :
Service 3 — Icône :   Titre :   Description courte :
Service 4 — Icône :   Titre :   Description courte :
```

---

## About

```
Titre de la section :
Texte (2-4 phrases) :
Photo               : [ ] Fournie  [ ] Unsplash  [ ] Aucune
Chiffres clés :
  Stat 1 — Valeur :   Label :
  Stat 2 — Valeur :   Label :
  Stat 3 — Valeur :   Label :
```

---

## Témoignages

```
Témoignage 1 — Nom :   Texte :   Note : /5
Témoignage 2 — Nom :   Texte :   Note : /5
Témoignage 3 — Nom :   Texte :   Note : /5
```

---

## CTA Banner

```
Titre   :
Texte   :
Bouton  :
```

---

## Domaine

```
Domaine acheté        : [ ] Oui :   [ ] Non (URL Vercel temporaire)
Registrar             : [ ] OVH  [ ] Autre :
DNS configurés        : [ ] Oui  [ ] Non — à faire après déploiement
```

---

## Web3Forms

```
Clé API Web3Forms : (à créer sur web3forms.com avec l'email du client)
Email de réception des messages : (email du client)
```

---

## Options vendues

```
[ ] Google Analytics + Search Console (+80€)
[ ] Cookie banner RGPD                (+80€)
[ ] WhatsApp flottant                 (+60€)
[ ] Autre :
```

---

## Contraintes et notes spécifiques

```
(noter ici tout ce qui sort de l'ordinaire pour ce client)
```

---

## Checklist avant de lancer Claude Code

```
[ ] content.json généré et relu
[ ] Images disponibles dans public/images/
[ ] Clé Web3Forms créée et testée
[ ] CLIENT.md complet (aucun champ vide critique)
[ ] Mode one-page ou multi-pages confirmé
```

---

## Checklist avant livraison

```
[ ] Formulaire de contact testé (vrai envoi reçu)
[ ] Site testé sur mobile 375px
[ ] Site testé sur desktop 1280px
[ ] PageSpeed mobile : score /100 (cible 90+)
[ ] Aucun texte "Lorem ipsum" ou placeholder visible
[ ] Aucune image manquante (alt présent partout)
[ ] Mentions légales présentes et remplies
[ ] Domaine branché et HTTPS actif
[ ] Repo GitHub transféré au client (après paiement)
[ ] Projet Vercel transféré au compte client (après paiement)
```
