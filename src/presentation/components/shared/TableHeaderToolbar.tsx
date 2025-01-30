import FilterListIcon from '@mui/icons-material/FilterList'
import AddIcon from '@mui/icons-material/Add'
import { IconButton, Stack, Toolbar, Tooltip, Typography } from "@mui/material"

interface TableHeaderToolbarProps {
  title?: string
  filterButton?: boolean
  addButton?: boolean
  onAdd?: () => void
}

export default function TableHeaderToolbar ({
  title,
  filterButton = false,
  addButton = false,
  onAdd
}: TableHeaderToolbarProps) {
  return (
    <Toolbar>
      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        width={'100%'}
      >
        <Typography
          sx={{ flex: '1 1 100%' }}
          width={'100%'}
          color="inherit"
          variant="h5"
          component="div"
        >
          {title}
        </Typography>

        <Stack direction={'row'}>
          {filterButton && (
            <Tooltip title="Filter list">
              <IconButton>
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          )}
          {addButton && (
            <Tooltip title="Add transaction">
              <IconButton onClick={onAdd}>
                <AddIcon />
              </IconButton>
            </Tooltip>
          )}
        </Stack>
      </Stack>
    </Toolbar>
  )
}
