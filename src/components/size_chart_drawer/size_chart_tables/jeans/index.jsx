import '@/components/size_chart_drawer/size_chart_tables/index.scss';

function JeansSizeChartTable() {
  return (
    <div className="size-chart-table">
      <table>
        <tbody>
          <tr>
            <th>Banana Pose</th>
            <td>28</td>
            <td>30</td>
            <td>32</td>
            <td>34</td>
            <td>36</td>
          </tr>
          <tr>
            <th>International</th>
            <td>28</td>
            <td>30</td>
            <td>32</td>
            <td>34</td>
            <td>36</td>
          </tr>
          <tr>
            <th>US</th>
            <td>34</td>
            <td>36</td>
            <td>38</td>
            <td>40</td>
            <td>42</td>
          </tr>
          <tr>
            <th>EU</th>
            <td>44</td>
            <td>46</td>
            <td>48</td>
            <td>50</td>
            <td>52</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default JeansSizeChartTable;
