import React from 'react'

import { CardContent, Typography } from "@mui/material"
import { Card } from "@mui/material"

export const Info = () => {
    return (
        <div>
            <Card sx={{ maxWidth: 340, position: "absolute", margin:2, left: 350 }}>
                <CardContent>
                    <Typography>
                        <b>Flood Risk Legend</b>
                    </Typography>
                    <div id="legend" className="map-overlay" sx={{ fontSize: 14, display:"flex" }} color="text.primary" />
                </CardContent>
            </Card>
        </div>
    )
}

export default Info