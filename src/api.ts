import axios from 'axios';

interface RestaurantsData {
	count: number, // number of hits
	hits: Restaurant[], // number of restaurants found from search
}

// Taken from https://mtlatable.mtl.org/en/search-restaurants
interface Restaurant {
	data_nid: string, // "3646"
	ecm_uuid: string, // "f41073d1-57d3-4a10-8a22-ef96a23d99fd"
	url: string, // "/en/restaurants/fiche-soubois-restaurant-montreal"
	background_image_url: string, // "/themes/tm_mtlatable/assets/images/search-fallback.jpg"
	title: string, // "Soubois Restaurant"
	surtitle: string, // New Cuisine
	summary: string, // "Soubois is a Bistro du Terroir, Bar and Nightclub, located in the downtown core."
	main_category_id: string, // "ParCat-Gastronomie"
	neighborhood_id: string[], // ["GenLoc-MCarre"]
	legal_name: string, // "Restaurant Soubois"
	price: string, // 43$
	cookingtype: string[], // ["ParCuis-R-NouvelleCuisine"]
	parent_product_nid: string | null, // null
	aeroplan: "0" | "1",
	brunch: "0" | "1",
	byow: boolean, // bring your own wine
	cacao_barry: "0" | "1",
	gluten_free: "0" | "1",
	vegan: "0" | "1",
	vegetarian: "0" | "1",
	specials: string, // "gluten_free,vegetarian"
}

interface GetRestaurantsParams {
	price?: number,
	page?: number,
	neighborhood?: string,
	specials?: string, // i.e. gluten_free,vegan
	cuisines?: string,
	page_context?: string
}

type NeibhorhoodName = 'GenLoc-PJD' | 'GenLoc-Village';
type Special = 'gluten_free' | 'aeroplan'

async function getRestaurants(params?: GetRestaurantsParams, test = false, page = 1): Promise<RestaurantsData> {
	if (test) {
		return page === 1 ? mockRestaurantDataPage1 : mockRestaurantDataPage2;
	}
	
	const res = await axios.get('https://mtlatable.mtl.org/en/search-restaurants', { params })

	return res.data;
}

export async function getAllBrunchRestaurants(): Promise<Restaurant[]> {
	// Get first page to calculate how many pages are in the API
	let restaurantData = await getRestaurants();
	console.log(restaurantData);
	const pageCount = calculatePageCount(restaurantData);
	console.log('pageCount: ', pageCount);
	const brunchRestaurants: Restaurant[] = [];

	for (let i = 0; i <= pageCount; i++) {
		restaurantData.hits.forEach(restaurant => {
			if (restaurant.brunch === "1") {
				brunchRestaurants.push(restaurant);
			}
		})

		restaurantData = await getRestaurants({ page: i });
		console.log(i, restaurantData)

		if (restaurantData.hits.length === 0) {
			console.log('hits is 0, exiting');
			break;
		}
	}

	return brunchRestaurants;
}

function calculatePageCount(restaurantData: RestaurantsData) {
	const count = restaurantData.count;
	const numEntriesPerPage = restaurantData.hits.length;
	
	return Math.ceil(count / numEntriesPerPage);
}


const mockRestaurantDataPage1: RestaurantsData = {
	count: 3,
	hits: [
		{
			aeroplan: "0",
			background_image_url: "https://mtlatable.mtl.org/sites/mtlatable/files/styles/product/public/2019-08/36795.jpg?itok=M6CXM8Gg",
			brunch: "0",
			byow: true,
			cacao_barry: "0",
			cookingtype: ["ParCuis-R-AmeriqueNord", "ParCuis-R-France", "ParCuis-R-Quebec"],
			data_nid: "2696",
			ecm_uuid: "829893b7-5efa-486a-966e-f2abe34d7ba2",
			gluten_free: "1",
			legal_name: "Bistro Smoking Vallée",
			main_category_id: "ParCat-Gastronomie",
			neighborhood_id: ["GenLoc-QCanalSH"],
			parent_product_nid: null,
			price: "$43",
			specials: "byow,gluten_free,vegetarian",
			summary: "A bring-your-own wine restaurant offering specialties including bavette, tuna tartar, and blade petite roast, served in a modern, stylish setting.",
			surtitle: "North America, France, Québec",
			title: "Bistro Smoking Vallée",
			url: "/en/restaurants/fiche-bistro-smoking-vallee-montreal",
			vegan: "0",
			vegetarian: "1",
		},
		{
			"data_nid": "1986",
			"ecm_uuid": "502ea717-f5ef-4c9c-a218-d68940ac83bf",
			"url": "/en/restaurants/fiche-josephine-montreal",
			"background_image_url": "https://mtlatable.mtl.org/sites/mtlatable/files/styles/product/public/2019-09/38833.jpg?itok=YaifDLUk",
			"title": "Joséphine",
			"surtitle": "New Cuisine, Québec",
			"summary": "Joséphine offers an optimal dining experience featuring exceptional fish and seafood, intricate flavours and astute wine/food pairings.",
			"main_category_id": "ParCat-Gastronomie",
			"neighborhood_id": [
					"GenLoc-Plateau"
			],
			"legal_name": "Joséphine Bistro Terrasse",
			"price": "$43",
			"cookingtype": [
					"ParCuis-R-NouvelleCuisine",
					"ParCuis-R-Quebec"
			],
			"parent_product_nid": null,
			"aeroplan": "1",
			"brunch": "0",
			"byow": false,
			"cacao_barry": "1",
			"gluten_free": "1",
			"vegan": "0",
			"vegetarian": "0",
			"specials": "aeroplan,cacao_barry,gluten_free"
		}
	]
}

const mockRestaurantDataPage2: RestaurantsData = {
	count: 3,
	hits: [
		{
			aeroplan: "1",
			background_image_url: "test url image background",
			brunch: "1",
			byow: true,
			cacao_barry: "0",
			cookingtype: ["ParCuis-R-AmeriqueNord", "ParCuis-R-France", "ParCuis-R-Quebec"],
			data_nid: "1",
			ecm_uuid: "829893b7-5efa-486a-966e-f2abe34d7ba2",
			gluten_free: "1",
			legal_name: "Test",
			main_category_id: "ParCat-Gastronomie",
			neighborhood_id: ["GenLoc-QCanalSH"],
			parent_product_nid: null,
			price: "$43",
			specials: "byow,gluten_free,vegetarian",
			summary: "test summary.",
			surtitle: "North America, France, Québec",
			title: "Test",
			url: "/en/restaurants/fiche-bistro-smoking-vallee-montreal",
			vegan: "1",
			vegetarian: "1",
		}
	]
}
