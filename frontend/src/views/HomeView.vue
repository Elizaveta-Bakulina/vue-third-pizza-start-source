<template>
	<main class="content">
		<form action="#" method="post">
			<div class="content__wrapper">
				<h1 class="title title--big">Конструктор пиццы</h1>

				<pizza-dough v-model="pizza.dough" :items="doughItems" />

				<pizza-size v-model="pizza.size" :items="sizeItems" />

				<div class="content__ingredients">
					<div class="sheet">
						<h2 class="title title--small sheet__title">
							Выберите ингредиенты
						</h2>

						<div class="sheet__content ingredients">
							<pizza-souce
								v-model="pizza.sauce"
								:items="sauceItems" />

							<pizza-ingredients
								:values="pizza.ingredients"
								:items="ingredientItems"
								@update="updateIngredientAmount" />
						</div>
					</div>
				</div>

				<div class="content__pizza">
					<label class="input">
						<span class="visually-hidden">Название пиццы</span>
						<input
							type="text"
							name="pizza_name"
							placeholder="Введите название пиццы" />
					</label>

					<pizza-components
						:dough="pizza.dough"
						:sauce="pizza.sauce"
						:ingredients="pizza.ingredients"
						@drop="addIngredient" />

					<div class="content__result">
						<p>Итого: {{ price }} ₽</p>
						<button
							type="button"
							class="button"
							:disabled="disableSubmit">
							Готовьте!
						</button>
					</div>
				</div>
			</div>
		</form>
	</main>
</template>
<script setup>
import { computed, reactive } from "vue";
import {
	normalizeDough,
	normalizeSize,
	normalizeSauces,
	normalizeIngredients,
} from "@/common/helpers.js";
import doughJSON from "@/mocks/dough.json";
import sizesJSON from "@/mocks/sizes.json";
import ingredientsJSON from "@/mocks/ingredients.json";
import saucesJSON from "@/mocks/sauces.json";
import PizzaSize from "@/modules/constructor/PizzaSize.vue";
import PizzaDough from "@/modules/constructor/PizzaDough.vue";
import PizzaSouce from "@/modules/constructor/PizzaSouce.vue";
import PizzaIngredients from "@/modules/constructor/PizzaIngredients.vue";
import PizzaComponents from "@/modules/constructor/PizzaComponents.vue";

const doughItems = doughJSON.map(normalizeDough);
const sizeItems = sizesJSON.map(normalizeSize);
const sauceItems = saucesJSON.map(normalizeSauces);
const ingredientItems = ingredientsJSON.map(normalizeIngredients);
const pizza = reactive({
	name: "",
	dough: doughItems[0].value,
	size: sizeItems[0].value,
	sauce: sauceItems[0].value,
	ingredients: ingredientItems.reduce((acc, item) => {
		acc[item.value] = 0;
		return acc;
	}, {}),
});

const price = computed(() => {
	const { dough, size, sauce, ingredients } = pizza;

	const sizeMultiplier =
		sizeItems.find((item) => item.value === size)?.multiplier ?? 1;

	const doughPrice =
		doughItems.find((item) => item.value === dough)?.price ?? 0;

	const saucePrice =
		sauceItems.find((item) => item.value === sauce)?.price ?? 0;

	/*
	 * Здесь мы при помощи метода map превращаем массив ингредиентов
	 * в массив значений, соответствующих итоговой стоимости каждого из них — просто умножаем цену на количество.
	 * После чего методом reduce вычисляем сумму всех элементов массива. Это даёт нам общую стоимость ингредиентов.
	 */
	const ingredientsPrice = ingredientItems
		.map((item) => ingredients[item.value] * item.price)
		.reduce((acc, item) => acc + item, 0);

	return (doughPrice + saucePrice + ingredientsPrice) * sizeMultiplier;
});

const disableSubmit = computed(() => {
	return pizza.name.length === 0 || price.value === 0;
});
const addIngredient = (ingredient) => {
	pizza.ingredients[ingredient]++;
};
const updateIngredientAmount = (ingredient, count) => {
	pizza.ingredients[ingredient] = count;
};
</script>
<style lang="scss">
@import "@/assets/scss/ds-system/ds.scss";
@import "@/assets/scss/mixins/mixins.scss";

.content__ingredients {
  width: 527px;
  margin-top: 15px;
  margin-right: auto;
  margin-bottom: 15px;
}

.content__pizza {
  width: 373px;
  margin-top: 15px;
  margin-bottom: 15px;
}

.content__result {
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 25px;

  p {
    @include b-s24-h28;

    margin: 0;
  }

  button {
    margin-left: 12px;
    padding: 16px 45px;
  }
}
</style>