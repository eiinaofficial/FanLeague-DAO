;; Club Registry Contract - FanLeague DAO
;; Clarity v2

(define-constant ERR-NOT-AUTHORIZED u100)
(define-constant ERR-CLUB-EXISTS u101)
(define-constant ERR-CLUB-NOT-FOUND u102)
(define-constant ERR-INVALID-METADATA u103)
(define-constant ERR-NOT-CLUB-ADMIN u104)
(define-constant ERR-ZERO-ADDRESS u105)

(define-data-var contract-admin principal tx-sender)

;; Each club has:
;; - club-admin (principal)
;; - club-name (string-ascii 50)
;; - metadata-uri (string-ascii 100)
;; - is-active (bool)
(define-map clubs
  uint
  {
    club-admin: principal,
    club-name: (string-ascii 50),
    metadata-uri: (string-ascii 100),
    is-active: bool
  }
)

(define-map club-owners principal uint)
(define-data-var club-count uint u0)

;; ========== Internal Helpers ==========

(define-private (only-admin)
  (asserts! (is-eq tx-sender (var-get contract-admin)) (err ERR-NOT-AUTHORIZED))
)

(define-private (assert-club-exists (club-id uint))
  (asserts! (is-some (map-get? clubs club-id)) (err ERR-CLUB-NOT-FOUND))
)

;; ========== Public Functions ==========

(define-public (transfer-admin (new-admin principal))
  (begin
    (only-admin)
    (asserts! (not (is-eq new-admin 'SP000000000000000000002Q6VF78)) (err ERR-ZERO-ADDRESS))
    (var-set contract-admin new-admin)
    (ok true)
  )
)

(define-public (register-club (club-name (string-ascii 50)) (metadata-uri (string-ascii 100)))
  (begin
    (asserts! (> (len metadata-uri) u4) (err ERR-INVALID-METADATA))
    (let ((club-id (+ u1 (var-get club-count))))
      (map-set clubs club-id {
        club-admin: tx-sender,
        club-name: club-name,
        metadata-uri: metadata-uri,
        is-active: true
      })
      (map-set club-owners tx-sender club-id)
      (var-set club-count club-id)
      (ok club-id)
    )
  )
)

(define-public (deactivate-club (club-id uint))
  (begin
    (assert-club-exists club-id)
    (let ((club (unwrap! (map-get? clubs club-id) (err ERR-CLUB-NOT-FOUND))))
      (asserts! (is-eq tx-sender (get club-admin club)) (err ERR-NOT-CLUB-ADMIN))
      (map-set clubs club-id (merge club { is-active: false }))
      (ok true)
    )
  )
)

(define-public (update-metadata (club-id uint) (new-uri (string-ascii 100)))
  (begin
    (assert-club-exists club-id)
    (asserts! (> (len new-uri) u4) (err ERR-INVALID-METADATA))
    (let ((club (unwrap! (map-get? clubs club-id) (err ERR-CLUB-NOT-FOUND))))
      (asserts! (is-eq tx-sender (get club-admin club)) (err ERR-NOT-CLUB-ADMIN))
      (map-set clubs club-id (merge club { metadata-uri: new-uri }))
      (ok true)
    )
  )
)

;; ========== Read-only Functions ==========

(define-read-only (get-club (club-id uint))
  (match (map-get? clubs club-id)
    (some club) (ok club)
    (none) (err ERR-CLUB-NOT-FOUND)
  )
)

(define-read-only (get-admin)
  (ok (var-get contract-admin))
)

(define-read-only (get-club-id-by-owner (owner principal))
  (match (map-get? club-owners owner)
    (some id) (ok id)
    (none) (err ERR-CLUB-NOT-FOUND)
  )
)

(define-read-only (get-total-clubs)
  (ok (var-get club-count))
)
