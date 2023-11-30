import React, { useState } from 'react'

function VoucherDetails({ route }) {
    const [details, setDetails] = useState([])
    console.log(route.params);
    return (
        <div>VoucherDetails</div>
    )
}

export default VoucherDetails