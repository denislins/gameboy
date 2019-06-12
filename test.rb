8.times do |i|
  # pairs = { 0x47 => 'A', 0x40 => 'B', 0x41 => 'C', 0x42 => 'D', 0x43 => 'E', 0x44 => 'H', 0x45 => 'L' }
  # pairs.each do |opcode, register|
  #   puts "{ opcode: 0x#{(opcode + 8 * i).to_s(16).upcase}, register: '#{register.downcase}', bit: #{i}, repr: 'BIT #{i}, #{register}' },"
  # end

  # puts "{ opcode: 0x#{(0x46 + 8 * i).to_s(16).upcase}, bit: #{i}, repr: 'BIT #{i}, (HL)' },"

  # pairs = { 0xC7 => 'A', 0xC0 => 'B', 0xC1 => 'C', 0xC2 => 'D', 0xC3 => 'E', 0xC4 => 'H', 0xC5 => 'L' }
  # pairs.each do |opcode, register|
  #   puts "{ opcode: 0x#{(opcode + 8 * i).to_s(16).upcase}, register: '#{register.downcase}', bit: #{i}, repr: 'SET #{i}, #{register}' },"
  # end

  # puts "{ opcode: 0x#{(0xC6 + 8 * i).to_s(16).upcase}, bit: #{i}, repr: 'SET #{i}, (HL)' },"

  # pairs = { 0x87 => 'A', 0x80 => 'B', 0x81 => 'C', 0x82 => 'D', 0x83 => 'E', 0x84 => 'H', 0x85 => 'L' }
  # pairs.each do |opcode, register|
  #   puts "{ opcode: 0x#{(opcode + 8 * i).to_s(16).upcase}, register: '#{register.downcase}', bit: #{i}, repr: 'RES #{i}, #{register}' },"
  # end

  puts "{ opcode: 0x#{(0x86 + 8 * i).to_s(16).upcase}, bit: #{i}, repr: 'RES #{i}, (HL)' },"
end
