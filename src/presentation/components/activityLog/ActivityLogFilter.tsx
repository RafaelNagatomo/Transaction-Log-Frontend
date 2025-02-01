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
import { useActivityLogStore } from "~/infrastructure/stores/activityLogStore"
import UserSelect from "../shared/UserSelect"

const actionTypes = ["create", "update", "delete"]

interface ActivityFilterListProps {
  closeDrawer: () => void
}

const ActivityFilterList: React.FC<ActivityFilterListProps> = ({ closeDrawer }) => {
  const { filters, setFilters, getAll } = useActivityLogStore()
  
  const handleQeuryFilters = () => {
    getAll()
    setFilters({})
    closeDrawer()
  }

  return (
    <Stack sx={{ width: 550, p: 2 }} gap={4}>
      <Typography fontSize={25}>Activity Log Filter</Typography>
      <Divider />

      <Box>
        <Typography mb={1}>Changed at</Typography>
        <Box display={"flex"} flexDirection={"row"} gap={1}>
          <DatePicker
            slotProps={{
              textField: {
                size: "small"
              }
            }}
            label="Start Date"
            onChange={(newValue) => setFilters({
              startDate: moment(newValue).format('YYYY-MM-DD')
            })}
          />
          <DatePicker
            slotProps={{
              textField: {
                size: "small"
              }
            }}
            label="End Date"
            onChange={(newValue) => setFilters({
              endDate: moment(newValue).format('YYYY-MM-DD')
            })}
          />
        </Box>
      </Box>

      <UserSelect setFilters={setFilters} />

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
          value={filters.userAgent}
          onChange={(event) => setFilters({
            userAgent: event.target.value
          })}
        />
      </Box>

      <Box display={"flex"} flexDirection={"row"} gap={1}>
        <Button
            type='submit'
            variant='outlined'
            color='secondary'
            size='small'
            onClick={closeDrawer}
          >
            Cancel
        </Button>
        <Button
            type='submit'
            variant='contained'
            color='primary'
            size='small'
            onClick={handleQeuryFilters}
          >
            Ok
        </Button>
      </Box>
    </Stack>
  )
}

export default ActivityFilterList
