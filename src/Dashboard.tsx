import { useEffect, useState } from 'react'
import Form from './Form'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'
import supabase from './supabase-client'

export type Metric = {
  name: string
  sum: number | null
}

const Dashboard = () => {
  const [metrics, setMetrics] = useState<Metric[]>([])

  useEffect(() => {

    fetchMetrics()
    const channel = supabase
      .channel('deal-changes')
      .on(
        'postgres_changes',
        { 
          event: '*', 
          schema: 'public', 
          table: 'sales_deals'  
        },
        (payload) => {
          // Action
          fetchMetrics()
          console.log(payload.new);
        })
      .subscribe();

    // Clean up subscription
    return () => {
      supabase.removeChannel(channel);
    };
  }, [])
  const fetchMetrics = async () => {
      try {
        const { data, error } = await supabase
          .from('sales_deals')
          .select(`
            name,
            value.sum()
          `)

        if (error) {
          throw error
        }

        const parsedData = (data ?? []) as Array<{ name: string; sum?: number | null }>
        const normalizedMetrics = parsedData.map((item) => ({
          name: item.name ?? 'Unknown',
          sum: typeof item.sum === 'number' ? item.sum : 0,
        }))

        setMetrics(normalizedMetrics)
        console.log('Fetched metrics:', normalizedMetrics)
      } catch (error) {
        console.error('Error fetching metrics:', error)
      }
    }

  const chartData = metrics.length
    ? metrics.map((metric) => ({
        name: metric.name,
        sales: metric.sum ?? 0,
      }))
    : [{ name: 'No data', sales: 0 }]

  return (
    <div className="dashboard-wrapper">
      <div className="chart-container">
        <h2>Total Sales This Quarter ($)</h2>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <Form metrics={metrics} />
    </div>
  )
}

export default Dashboard