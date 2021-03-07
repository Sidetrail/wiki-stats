import React, { useState, useEffect, useRef } from "react";
import _ from "lodash";
import { select, geoPath, geoMercator, min, max, scaleLinear } from "d3";
import world from "../Data/World.geo.json";
import { getTopDataEntries } from "../Services/RankedService";
import "./GeoData.scss";

const GeoData = ({ data = [] }) => {
  const svgRef = useRef();
  const wrapperRef = useRef();

  const [selectedCountry, setSelectedCountry] = useState();

  useEffect(() => {
    const svg = select(svgRef.current);

    const { width, height } = svgRef.current.getBoundingClientRect();

    //User selected projection?
    const projection = geoMercator().fitSize(
      [width, height],
      selectedCountry || world
    );
    const pathGenerator = geoPath().projection(projection);

    //eventually add additions/removals
    const geoMap = {};
    data.forEach(
      (message) =>
        (geoMap[message.geo_ip.country_name] =
          (geoMap[message.geo_ip.country_name] || 0) + 1)
    );

    const maxValue = max(
      world.features,
      (feature) => geoMap[feature.properties.name]
    );

    const colorScale = scaleLinear()
      .domain([0, maxValue])
      .range(["#fee0d2", "#de2d26"]);

    svg
      .selectAll(".country")
      .data(world.features)
      .join("path")
      .on("click", (e, feature) =>
        setSelectedCountry(selectedCountry === feature ? null : feature)
      )
      .attr("class", "country")
      .transition()
      .attr("fill", (feature) =>
        colorScale(geoMap[feature.properties.name] || 0)
      )
      .attr("d", (feature) => pathGenerator(feature));
  }, [data]);

  const getGeoData = () => data.length;

  const getTopCountries = () =>
    getTopDataEntries(
      data.map((i) => i.geo_ip),
      "country_name"
    ).map((entry) => `${entry[0]}: ${entry[1].length}`);

  const getTopCities = () =>
    getTopDataEntries(
      data.map((i) => i.geo_ip),
      "city"
    ).map((entry) => `${entry[0]}: ${entry[1].length}`);

  const getTopRegions = () =>
    getTopDataEntries(
      data.map((i) => i.geo_ip),
      "region_name"
    ).map((entry) => `${entry[0]}: ${entry[1].length}`);

  return (
    <div className="geoData">
      <h1>Geo Stuff</h1>
      <div>Number with GeoIp: {getGeoData()}</div>
      <div>Top Countries: {getTopCountries()}</div>
      <div>Top regions: {getTopRegions()}</div>
      <div>Top Cities: {getTopCities()}</div>
      <svg ref={svgRef} height="900px" width="1000px"></svg>
    </div>
  );
};

export default GeoData;
