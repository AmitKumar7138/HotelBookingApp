import { useQuery } from "react-query";
import { useSearchContext } from "../contexts/SearchContext";
import * as apiClient from "../api_client";
import React, { useState } from "react";
import SearchResultCards from "../components/SearchResultCards";
import Pagination from "../components/Pagination";
import StarRatingFilter from "../components/StarRatingFilter";
import HotelTypesFilter from "../components/HotelTypesFilter";
import FacilitiesFilter from "../components/FacilitiesFilter";
import MaxPriceFilter from "../components/MaxPriceFilter";


export default function Search() {

    const search = useSearchContext();

    const [page, setPage] = useState<number>(1);
    const [selectedStars, setSelectedStars] = useState<string[]>([]);
    const [selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>([]);
    const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
    const [selectedMaxPrice, setSelectedMaxPrice] = useState<number | undefined>();
    const [sortOption, setSortOption] = useState<string>("");

    const serachParams = {
        destination: search.destination,
        checkIn: search.checkIn.toISOString(),
        checkOut: search.checkOut.toISOString(),
        adultCount: search.adultCount.toString(),
        childCount: search.childCount.toString(),
        page: page.toString(),
        stars: selectedStars,
        types: selectedHotelTypes,
        facilities: selectedFacilities,
        maxPrice: selectedMaxPrice?.toString(),
        sortOption,
    }

    const { data: hotelData } = useQuery(["searchHotels", serachParams], () => apiClient.SearchHotels(serachParams));

    const handleStarsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const starRating = event.target.value;

        setSelectedStars((prevStars) =>
            event.target.checked
                ? [...prevStars, starRating]
                : prevStars.filter((star) => star !== starRating)
        );
    }



    const handleHotelTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const hotelTypes = event.target.value;

        setSelectedHotelTypes((prevHotelTypes) =>
            event.target.checked
                ? [...prevHotelTypes, hotelTypes]
                : prevHotelTypes.filter((hotelType) => hotelType !== hotelTypes)
        );
    }


    const handleFacilitiesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const faciliyTypes = event.target.value;

        setSelectedFacilities((prevfacilityTypes) =>
            event.target.checked
                ? [...prevfacilityTypes, faciliyTypes]
                : prevfacilityTypes.filter((facility) => facility !== faciliyTypes)
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
            <div className="rounded-l border border-slate-300 p-5 h-fit sticky top-10">
                <div className="space-y-5">
                    <h3 className="text-lg font-semibold border-b border-slate-300 pb-5"> Filter by:</h3>
                    <StarRatingFilter
                        selectedStars={selectedStars}
                        onChange={handleStarsChange} />

                    <HotelTypesFilter
                        selectedHotelTypes={selectedHotelTypes}
                        onChange={handleHotelTypeChange} />
                    <FacilitiesFilter
                        selectedFacilities={selectedFacilities}
                        onChange={handleFacilitiesChange} />
                    <MaxPriceFilter
                        selectedMaxPrice={selectedMaxPrice}
                        onChange={(value?: number) => setSelectedMaxPrice(value)} />

                </div>
            </div>

            <div className="flex flex-col gap-5">
                <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">
                        {hotelData?.pagination.total} hotels found
                        {search.destination ? ` in ${search.destination}` : ""}
                    </span>
                    <select
                        value={sortOption}
                        onChange={(event) => setSortOption(event.target.value)}
                        className="p-2 border rounded-md">
                        <option value=""> Sort By</option>
                        <option value="starRating"> Star Rating</option>
                        <option value="pricePerNightAsc"> Price Per Night (low to high)</option>
                        <option value="pricePerNightDsc"> Price Per Night (high to low)</option>
                    </select>
                </div>
                {hotelData?.data.map((hotel) => (
                    <SearchResultCards hotel={hotel} />
                ))}
                <div>
                    <Pagination
                        page={hotelData?.pagination.page || 1}
                        pages={hotelData?.pagination.pages || 1}
                        onPageChange={(page) => setPage(page)}
                    />
                </div>
            </div>
        </div>
    );
}
