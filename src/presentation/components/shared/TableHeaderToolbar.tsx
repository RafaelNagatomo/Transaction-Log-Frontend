import FilterListIcon from '@mui/icons-material/FilterList'
import AddIcon from '@mui/icons-material/Add'
import {
  IconButton,
  Stack,
  Toolbar,
  Tooltip,
  Typography
} from "@mui/material"

interface TableHeaderToolbarProps {
  title?: string
  filterButton?: boolean
  addButton?: boolean
  onAdd?: () => void
  onFilter?: () => void
}

export default function TableHeaderToolbar ({
  title,
  filterButton = false,
  addButton = false,
  onAdd,
  onFilter
}: TableHeaderToolbarProps) {
  const toolipTitle =
    title?.endsWith('s')
      ? title?.toLowerCase().slice(0, -1)
      : title?.toLowerCase()

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
            <Tooltip title="Filter List">
              <IconButton onClick={onFilter}>
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          )}
          {addButton && (
            <Tooltip title={`Add ${toolipTitle}`}>
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
