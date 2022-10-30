import { Request, Response } from "express";
import { deleteDeck } from "../repositories/DeleteDeckRepository";
import { getDecks } from "../repositories/ListDecksRepository";

export async function deleteDeckController(req: Request, res: Response) {
    const { id } = req.query;
    const decks = await getDecks();

    const deckAlreadyExists = decks.find(deck => deck.id === id)

    if (deckAlreadyExists) {
        await deleteDeck(deckAlreadyExists.id)
        return res.status(201).json({ message: "Deck deleted" })
    }

    return res.status(404).json({ message: "Deck not found" })
}