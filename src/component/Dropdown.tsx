import React, { useEffect, useState } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native"
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { sortListBy } from "../redux/slices/movie";
import { ChevronRight, ChevronDown } from "lucide-react-native";
import { getString, saveString, STORAGE_KEYS } from "../libs/storage";


type Category = {
  id: number,
  name: string,
  value: string,
}

type DropdownProps = {
  label: string
  options: Category[]
  onSelect: (value: string) => void
  type?: string
};

const Dropdown: React.FC<DropdownProps> = ({ label, options, onSelect, type }) => {
  const [open, setOpen] = useState(false)
  const [categorySelected, setCategorySelected] = useState(label)
  const [sortSelected, setSortSelected] = useState('Sort By')
  const dispatch = useAppDispatch()
  const nameShowing = type == 'category' ? categorySelected : sortSelected
  const loading = useAppSelector(state => state.movie.loading)

  const handleSelect = (_item: Category) => {
    setCategorySelected(_item?.name)
    setOpen(false)
    onSelect(_item?.value)
    saveString(STORAGE_KEYS.category, _item?.value)
  }

  const handleSort = (_item: Category) => {
    dispatch(sortListBy(_item?.value))
    setSortSelected(_item?.name)
    setOpen(false)
    saveString(STORAGE_KEYS.sortBy, _item?.value)
  }

  useEffect(() => {
    console.log('======loading', loading)
    if (loading) {
      return
    } else {
      const bootstrap = async () => {
        const savedCategory = await getString(STORAGE_KEYS.category)
        if (type === 'category') {
          const found = options.find(o => o.value === savedCategory)
          if (found) {
            setCategorySelected(found.name)
            onSelect(found.value)
          }
        }

        if (!type) {
          const savedSort = await getString(STORAGE_KEYS.sortBy)
          const foundSort = options.find(o => o.value === savedSort)
          if (foundSort) {
            setSortSelected(foundSort.name)
            dispatch(sortListBy(foundSort.value))
          }
        }
      }
      bootstrap()
    }
  }, [loading])

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => setOpen((prev) => !prev)}
      >
        <Text style={styles.headerText}>{nameShowing}</Text>
        {open ? <ChevronDown /> : <ChevronRight />}
      </TouchableOpacity>

      {open && (
        <View style={styles.dropdown}>
          <FlatList
            data={options}
            keyExtractor={(item, index) => `${item?.id}-${index}`}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.option,
                  item.name === nameShowing && styles.activeOption,
                ]}
                onPress={() => type == 'category' ? handleSelect(item) : handleSort(item)}
              >
                <Text
                  style={[
                    styles.optionText,
                    item.name === nameShowing && styles.activeText,
                  ]}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  )
}

export default Dropdown

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    borderRadius: 10,
    backgroundColor: "#fff",
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  dropdown: {
    paddingVertical: 6,
  },
  option: {
    padding: 12,
    backgroundColor: "#f9f9f9",
    marginHorizontal: 6,
    borderRadius: 6,
    marginVertical: 2,
  },
  activeOption: {
    backgroundColor: "#00AEEF",
  },
  optionText: {
    fontSize: 15,
    color: "#333",
  },
  activeText: {
    color: "white",
    fontWeight: "600",
  },
})
