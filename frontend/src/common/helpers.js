import doughSizes from "@/common/data/doughSizes";
import sizesPizza from "@/common/data/sizes";
import saucesList from "@/common/data/sauces";
import ingredientsList from "@/common/data/ingredients";
export const normalizeDough = dough => {
    return {
      ...dough,
      value: doughSizes[dough.id],
    };
  };
export const normalizeSize = size => {
    return {
      ...size,
      value: sizesPizza[size.id],
    };
  };
export const normalizeSauces = sauce => {
    return {
      ...sauce,
      value: saucesList[sauce.id],
    };
  };
export const normalizeIngredients = ingredient => {
    return {
      ...ingredient,
      value: ingredientsList[ingredient.id],
    };
  };