import { Box, TextField, MenuItem } from "@mui/material";

export const MuiSelect = (props) => {
  const handleChange = (event) => {
    setSelect(event.target.value);
  };

  const { label, options, setSelect, selectedOption, disabled, width } = props;

  return (
    <Box
      width={width}
      margin
      sx={{
        "@media (min-width: 768px)": {
          width: "100px"
        }
      }}
    >
      <TextField
        label={label}
        select
        value={selectedOption}
        onChange={handleChange}
        fullWidth
        size="small"
        disabled={disabled}
      >
        {options?.map((option) => {
          return (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          );
        })}
      </TextField>
    </Box>
  );
};
