import React, { useState } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native"
import { Icon } from "@rneui/themed";
import { useAppDispatch } from "../redux/hooks";
import { setSelectedCategory } from "../redux/slices/movie";

type DropdownProps = {
  label: string
  options: string[]
  onSelect: (value: string) => void
};

const Dropdown: React.FC<DropdownProps> = ({ label, options, onSelect }) => {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(label)
  const dispatch = useAppDispatch()

  const handleSelect = (value: string) => {
    dispatch(setSelectedCategory(value))
    setSelected(value)
    setOpen(false)
    onSelect(value)
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => setOpen((prev) => !prev)}
      >
        <Text style={styles.headerText}>{selected}</Text>
        <Icon name="play" size={20} color="black" />
      </TouchableOpacity>

      {open && (
        <View style={styles.dropdown}>
          <FlatList
            data={options}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.option,
                  item === selected && styles.activeOption,
                ]}
                onPress={() => handleSelect(item)}
              >
                <Text
                  style={[
                    styles.optionText,
                    item === selected && styles.activeText,
                  ]}
                >
                  {item}
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
