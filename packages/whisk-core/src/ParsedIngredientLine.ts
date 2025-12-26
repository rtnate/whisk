// whisk-core/src/ParsedIngredientLine.ts
import type { Quantity } from "./Quantity";

/**
 * Represents the structured result of parsing a single ingredient line.
 *
 * Parsing in Whisk is a **syntactic** operation. It tokenizes the input text
 * into three logical components without attempting semantic resolution:
 *
 * 1. **Quantity amount** — a normalized numeric value
 * 2. **Quantity unit** — an identified measurement unit (if present)
 * 3. **Ingredient text** — the remaining free-form ingredient description
 *
 * The parser intentionally preserves original text where possible to allow
 * lossless round-tripping, user-friendly display, and downstream resolution.
 *
 * No ingredient lookup, unit conversion, or density inference occurs at this
 * stage. Those responsibilities belong to later normalization steps.
 */
export interface ParsedIngredientLine {
  /**
   * The original, unmodified ingredient line as provided by the user.
   */
  source: string;

  /**
   * The parsed quantity, if one was present.
   *
   * The numeric value is normalized (for example, fractions are converted
   * to decimals), and the unit is identified when possible.
   */
  quantity?: Quantity;

  /**
   * The remaining ingredient text after quantity and unit tokens are removed.
   *
   * This value is preserved as-entered and is intended to be used as input
   * for ingredient matching and resolution.
   */
  ingredientText: string;

  /**
   * The unit token as it appeared in the original input.
   *
   * This field preserves the user's original unit wording (for example,
   * "c", "cup", or "cups") and may be used for display or debugging.
   *
   * Consumers that require normalized or formatted unit output should
   * derive it from the parsed `quantity.unit` instead.
   */
  unitText?: string;
}
