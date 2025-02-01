import React from "react"
import moment from "moment"
import {
  TextField,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Divider,
  Stack,
  Box,
  Typography,
  Button
} from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { initialFilters, useActivityLogStore } from "~/infrastructure/stores/activityLogStore"
import UserSelect from "../shared/UserSelect"

const actionTypes = ["Create", "Update", "Delete"]

interface ActivityFilterListProps {
  closeDrawer: () => void
}

const ActivityFilterList: React.FC<ActivityFilterListProps> = ({ closeDrawer }) => {
  const { filters, setFilters, getAll } = useActivityLogStore()
  
  const handleQeuryFilters = () => {
    getAll()
    closeDrawer()
  }

  const handleClearFilter = () => {
    setFilters(initialFilters)
  }

  return (
    <Stack sx={{ height: '100%', width: 550, p: 2 }} gap={4}>
      <Typography fontSize={25}>Activity Log Filter</Typography>
      <Divider />

      <Box>
        <Typography mb={1}>Changed at</Typography>
        <Box display={"flex"} flexDirection={"row"} gap={1}>
          <DatePicker
            label="Start Date"
            value={moment(filters?.startDate)}
            slotProps={{
              textField: {
                size: "small"
              }
            }}
            onChange={(newValue) => setFilters({
              startDate: moment(newValue).format('YYYY-MM-DD')
            })}
          />
          <DatePicker
            value={moment(filters?.endDate)}
            label="End Date"
            slotProps={{
              textField: {
                size: "small"
              }
            }}
            onChange={(newValue) => setFilters({
              endDate: moment(newValue).format('YYYY-MM-DD')
            })}
          />
        </Box>
      </Box>

      <UserSelect
        filters={filters}
        setFilters={setFilters}
      />

      <Box>
        <Typography mb={1}>Action</Typography>
        <FormGroup row>
          {actionTypes.map((action) => (
            <FormControlLabel
              key={action}
              control={
                <Checkbox
                  checked={filters?.action?.[action] || false}
                  onChange={(_, checked) =>setFilters({
                    action: {
                      ...filters.action,
                      [action]: checked
                    }
                  })}
                />
              }
              label={action.charAt(0).toUpperCase() + action.slice(1)}
            />
          ))}
        </FormGroup>
      </Box>

      <Box>
        <Typography mb={1}>User Agent</Typography>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          placeholder="Enter User Agent"
          value={filters?.userAgent}
          onChange={(event) => setFilters({
            userAgent: event.target.value
          })}
        />
      </Box>

      <Box
        gap={1}
        height={'100%'}
        display={"flex"}
        justifyContent={'end'}
        alignItems={'end'}
      >
        <Button
          sx={{ width: 100 }}
          type='submit'
          variant='outlined'
          color='primary'
          onClick={handleClearFilter}
        >
          Clear
        </Button>
        <Button
          sx={{ width: 100 }}
          type='submit'
          variant='contained'
          color='primary'
          onClick={handleQeuryFilters}
        >
          Search
        </Button>
      </Box>
    </Stack>
  )
}

export default ActivityFilterList
