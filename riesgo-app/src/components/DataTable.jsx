import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  export default function DataTable(props) {
    const cityName = props.cityName;

    var displayPopulation;
    var displayArea;
    var displayElevation;

    if (cityName === "l_manila") {
        displayPopulation = "456,059 (2020 census)";
        displayArea = "21.52 km2 (8.31 sq mi)";
        displayElevation = "48 m (157 ft)";
    } else if (cityName === "l_pasig") {
      displayPopulation = "803,159 (2020 census)";
      displayArea = "31.00 km2 (11.97 sq mi)";
      displayElevation = "9.0 m (29.5 ft)";
    } else if (cityName === "l_marikina") {
      displayPopulation = "456,059 (2020 census)";
      displayArea = "21.52 km2 (8.31 sq mi)";
      displayElevation = "48 m (157 ft)";
    }

    const rows = [
      createData('Population', displayPopulation),
      createData('Area (Average)', displayArea),
      createData('Elevation (Average)', displayElevation),
    ];

    return (
      <TableContainer component={Paper}>
        <Table aria-label="caption table">
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right"><b>{row.calories}</b></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }