"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select } from "@/components/ui/select"

interface SearchFilterProps {
  onSearch: (query: string) => void
  onFilterChange: (filter: string) => void
}

export function SearchFilter({ onSearch, onFilterChange }: SearchFilterProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = () => {
    onSearch(searchQuery)
  }

  return (
    <div className="mb-8 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
      <Input
        type="text"
        placeholder="Search fairs..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="flex-grow"
      />
      <Select onValueChange={onFilterChange} defaultValue="all">
        <option value="all">All Locations</option>
        <option value="usa">USA</option>
        <option value="europe">Europe</option>
        <option value="asia">Asia</option>
      </Select>
      <Button onClick={handleSearch}>Search</Button>
    </div>
  )
}

