import { useState } from 'react'

import Button from '@/components/common/Button/Button'
import Card from '@/components/common/Card/Card'
import CardTitle from '@/components/common/Card/CardTitle'
import Paginator from '@/components/common/Paginator/Paginator'
import Spinner from '@/components/common/Spinner/Spinner'
import { Table, TableHeader, TableBody, TableCell, TableRow, TableColumn } from '@/components/common/Table'
import Input from '@/components/forms/Input/Input'
import DatePicker from '@/components/forms/DatePicker/DatePicker'
import PasswordEyeInput from '@/components/forms/PasswordEyeInput/PasswordEyeInput'
import Select from '@/components/forms/Select/Select'

import './Home.css'

const Home = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())
    const [inputValue, setInputValue] = useState('')
    const [password, setPassword] = useState('')
    const [selectValue, setSelectValue] = useState('option1')

    const options = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
    ]

    const tableData = [
        { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'Pending' },
    ]

    return (
        <div className="home-container">
            <h1>Components Showcase</h1>

            {/* Buttons Section */}
            <Card>
                <CardTitle>Buttons</CardTitle>
                <div className="button-grid">
                    {/* Primary Buttons */}
                    <Button variant="primary" size="sm">Small Primary</Button>
                    <Button variant="primary" size="md">Medium Primary</Button>
                    <Button variant="primary" size="lg">Large Primary</Button>
                    <Button variant="primary" size="xl">Extra Large Primary</Button>

                    {/* Secondary Buttons */}
                    <Button variant="secondary" size="md">Secondary</Button>
                    <Button variant="warning" size="md">Warning</Button>
                    <Button variant="danger" size="md">Danger</Button>
                    <Button variant="info" size="md">Info</Button>
                    <Button variant="success" size="md">Success</Button>
                </div>
            </Card>

            {/* Input Fields Section */}
            <Card>
                <CardTitle>Input Fields</CardTitle>
                <div className="input-grid">
                    <Input
                        name="password"
                        type="password"
                        size="md"
                        label="Input"
                        variant="faded"
                        placeholder='Password'
                        // labelPlacement='inside'
                        minLength={4}
                        value={inputValue}
                        setValue={setInputValue} 
                    />
                    <Input
                        name="password"
                        type="password"
                        size="md"
                        label="Input"
                        variant="faded"
                        // placeholder='Placeholder'

                        // labelPlacement='inside'
                        minLength={4}
                        value={inputValue}
                        setValue={setInputValue} 
                    />
                    <PasswordEyeInput
                        name="password"
                        // label="Password"
                        value={password} 
                        setValue={setPassword} 
                        placeholder="Password Input"
                    />
                    <Input
                        name="password"
                        radius="full"

                        type="password"
                        size="md"
                        label="Input"
                        variant="faded"
                        // placeholder='Placeholder'
                        
                        labelPlacement='inside'
                        minLength={4}
                        value={inputValue}
                        setValue={setInputValue} 
                    />
                    <Input
                        name="password"
                        type="password"
                        size="md"
                        label="Input"
                        variant="faded"
                        placeholder='Placeholder'
                        
                        labelPlacement='inside'
                        minLength={4}
                        value={inputValue}
                        setValue={setInputValue} 
                    />
                    <DatePicker 
                        // label="Date"
                        value={selectedDate} 
                        onChange={setSelectedDate} 
                        placeholderText="Select Date"
                    />
                    <Select
                        // label="Select"
                        value={selectValue} 
                        onChange={(e) => setSelectValue(e.target.value)} 
                        options={options}
                    />
                </div>
            </Card>

            {/* Table Section */}
            <Card>
                <CardTitle>Table</CardTitle>
                <Table>
                    <TableHeader>
                        <TableColumn>ID</TableColumn>
                        <TableColumn>Name</TableColumn>
                        <TableColumn>Email</TableColumn>
                        <TableColumn>Status</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {tableData.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>{row.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>

            {/* Paginator Section */}
            <Card>
                <CardTitle>Paginator</CardTitle>
                <div className="paginator-container">
                    <Paginator 
                        page={3} 
                        numPages={10} 
                        onPageChange={(page) => console.log(page)}
                        size="md"
                        variant="rounded"
                        showEdges={true}
                        maxVisiblePages={5}
                    />
                </div>
            </Card>

            {/* Spinner Section */}
            <Card>
                <CardTitle>Spinner</CardTitle>
                <div className="spinner-container">
                    <Spinner variant="primary" />
                    <Spinner variant="secondary" />
                </div>
            </Card>
        </div>
    )
}

export default Home