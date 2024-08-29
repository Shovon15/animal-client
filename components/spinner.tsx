import React from 'react'
import ClipLoader from "react-spinners/ClipLoader";
type Props = {}

const Spinner = (props: Props) => {
    return (
        <ClipLoader
            color="#ffffff"
            size={30}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
    )
}

export default Spinner