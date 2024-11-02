function encodeFlashcards(cards) {
    return btoa(Array.from(new TextEncoder().encode(cards), (byte) => String.fromCodePoint(byte),).join(""));
}

function decodeFlashcards(cards) {
    return new TextDecoder().decode(Uint8Array.from(atob(cards), (m) => m.codePointAt(0)));
}

function cardsToObject(cards) {
    
}