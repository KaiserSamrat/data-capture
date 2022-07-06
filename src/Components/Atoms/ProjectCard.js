import CardComponent from "components/Layout/CardComponent"
import PropTypes from "prop-types"
import React from "react"

const ProjectCard = ({ title, data }) => {
  return (
    <React.Fragment>
      <CardComponent>
        <div className="pb-3 text-center">
          <h4 className="text-black ">{title}</h4>
        </div>
        {data.map((data, idx) => (
          <div
            key={idx}
            className="mb-3"
            style={{ borderBottom: "1.5px solid #ADB5BD" }}
          >
            <h3 className="font-size-14 text-black">{data.name}</h3>
            <p>{data.value}</p>
          </div>
        ))}
      </CardComponent>
    </React.Fragment>
  )
}

ProjectCard.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array,
}

export default ProjectCard
