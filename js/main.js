function encodeFlashcards(cards, version) {
    switch (version) {
        case "1":
            return encodeFlashcardsV1(cards);
        case "2":
            return encodeFlashcardsV2(cards);
        default:
            return encodeFlashcardsV2(cards);
    }
}

function encodeFlashcardsV1(cards) {
    return btoa(cards);
}

function encodeFlashcardsV2(cards) {
    return btoa(Array.from(new TextEncoder().encode(cards), (byte) => String.fromCodePoint(byte),).join(""));
}

function decodeFlashcards(cards, version) {
    switch (version) {
        case "1":
            return decodeFlashcardsV1(cards);
        case "2":
            return decodeFlashcardsV2(cards);
        default:
            return decodeFlashcardsV2(cards);
    }
}

function decodeFlashcardsV1(cards) {
    return atob(cards);
}

function decodeFlashcardsV2(cards) {
    return new TextDecoder().decode(Uint8Array.from(atob(cards), (m) => m.codePointAt(0)));
}

function cardsToObject(cards) {
    let safeString = cards
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&apos;");
    let flashcards = safeString.split(/\r\n|\r|\n/g);
    let arr = [];
    flashcards.forEach((element) => {
        let card = element.split("\t");
        arr.push({front: card[0], back: card[1]});
    });
    return arr;
}
