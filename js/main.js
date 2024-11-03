function encodeFlashcards(cards, version) {
    switch (version) {
        case "1":
            return encodeFlashcardsV1(cards);
        default:
            return encodeFlashcardsV1;
    }
}

function encodeFlashcardsV1(cards) {
    alert("called encodeFlashcardsV1");
    alert(btoa(Array.from(new TextEncoder().encode(cards), (byte) => String.fromCodePoint(byte),).join("")));
    return btoa(Array.from(new TextEncoder().encode(cards), (byte) => String.fromCodePoint(byte),).join(""));
}

function decodeFlashcards(cards, version) {
    switch (version) {
        case "1":
            return decodeFlashcardsV1(cards);
        default:
            return decodeFlashcardsV1(cards);
    }
}

function decodeFlashcardsV1(cards) {
    alert("called decodeFlashcardsV1");
    alert(new TextDecoder().decode(Uint8Array.from(atob(cards), (m) => m.codePointAt(0))));
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
    let cards = [];
    flashcards.forEach((element) => {
        let theCard = element.split("\t");
        cards.push({front: theCard[0], back: theCard[1]});
    });
    return cards;
}
